import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import InvoiceDialog from "./invoice-dialog";
import {BodyWrapper} from "../../../pages/body-wrapper";
import {makeGetAllInvoicesRequest} from "../request-utils";

const columns = [
    {id: "number", label: "Invoice #", minWidth: 100},
    {id: "status", label: "Status", minWidth: 100},
    {
        id: "date",
        label: "Registration Date",
        minWidth: 150,
    },
    {id: "shipper", label: "Shipper", minWidth: 300},
    {id: "consignee", label: "Consignee", minWidth: 300},
    {id: "waybillId", label: "Waybill", minWidth: 100},
];

function fetchFieldFromObject(obj, prop) {
    if (obj === undefined || obj === null) {
        return;
    }
    let index = prop.indexOf(".");
    if (index > -1) {
        return fetchFieldFromObject(
            obj[prop.substring(0, index)],
            prop.substr(index + 1)
        );
    }
    return obj[prop];
}

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});


export function InvoiceTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [invoices, setInvoices] = useState([]);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);

    // const [toastComponent, showToastComponent] = useToast();

    function handleRequestError(error) {
        console.log(invoices)
        if (error.response && !error.response.status === 500) {
            // showToastComponent(error.response.data, "error");
            alert("ERROR");
            console.log(error);
        } else {
            // showToastComponent("Cannot get response from server", "error");
            alert("ERROR");
            console.log(error);
        }
    }

    async function updateTable() {
        try {
            const response = await makeGetAllInvoicesRequest();
            setInvoices(response.data);
        } catch (error) {
            setInvoices([]);
            handleRequestError(error);
        }
    }

    useEffect(() => {
        let mounted = true;
        makeGetAllInvoicesRequest()
            .then((res) => {
                    if (mounted) {
                        setInvoices(res.data)
                    }
                }
            )
            .catch((err) => {
                setInvoices([]);
                handleRequestError(err)
            })
        return () => mounted = false;
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleTableRowClick = (invoice) => {
        if (invoice.status === "REJECTED") {
            setSelectedInvoiceId(invoice.id);
            setInvoiceDialogOpen(true);
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((client) => {
                                    return (
                                        <TableRow
                                            onClick={() => {
                                                handleTableRowClick(client);
                                            }}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={client.id}
                                        >
                                            {columns.map((column) => {
                                                let value = fetchFieldFromObject(client, column.id);
                                                if (value === "SP") {
                                                    value = "Sole proprietorship";
                                                } else if (value === "JP") {
                                                    value = "Juridical person";
                                                }
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={invoices.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <InvoiceDialog
                    invoiceId={selectedInvoiceId}
                    open={invoiceDialogOpen}
                    onClose={() => {
                        setInvoiceDialogOpen(false);
                    }}
                />
            </Paper>

            {/* {toastComponent} */}
        </div>
    );
}

export default () => <BodyWrapper content={InvoiceTable}/>