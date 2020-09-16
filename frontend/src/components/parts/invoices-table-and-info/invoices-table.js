import React, {useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import WaybillDialog from "./waybill-dialog";
import {getAllInvoices, getInvoiceById} from "./request-utils";
import {assignFillingWaybill} from "../dialogs/fill-waybill";
import {DialogWindow} from "../dialog";
import {Typography} from "@material-ui/core";
import {InvoiceInfo} from "./invoice-info";

const columns = [
    {id: "number", label: "Invoice #", minWidth: 100},
    {id: "status", label: "Status", minWidth: 100},
    {
        id: "date",
        label: "Registration Date",
        minWidth: 150,
        format: (value) => value.toFixed(2),
    },
    {id: "shipper", label: "Shipper", minWidth: 300},
    {id: "consignee", label: "Consignee", minWidth: 300},
    {id: "waybill", label: "Waybill", minWidth: 100},
];

function fetchFieldFromObject(obj, prop) {
    let index = prop.indexOf(".");
    if (index > 0) {
        return fetchFieldFromObject(
            obj[prop.substring(0, index)],
            prop.substr(index + 1)
        );
    }
    return obj[prop];
}

export default function InvoicesTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [invoices, setInvoices] = React.useState([]);
    const [invoice, setInvoice] = React.useState({id: 0, waybillId: "", invoiceStatus: ""});
    const [form, setForm] = React.useState(null);
    const [waybillFillDialogOpen, setWaybillFillDialogOpen] = React.useState(false);
    const [waybillDialogOpen, setWaybillDialogOpen] = React.useState(false);
    const [invoiceInfoDialogOpen, setInvoiceInfoDialogOpen] = React.useState(false);

    async function fetchInvoices(cleanupFunction) {
        if(!cleanupFunction) setInvoices(await getAllInvoices());
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchInvoices(cleanupFunction);
        return () => cleanupFunction = true;
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    let foundInvoice;
    const handleTableRowClick = async (inv) => {
        foundInvoice = await getInvoiceById(inv.id);
        setInvoice(() => ({
            id: foundInvoice.id,
            invoiceStatus: foundInvoice.invoiceStatus,
            waybillId: foundInvoice.waybillId,
        }));
        if (foundInvoice.invoiceStatus === "ACCEPTED"
            && foundInvoice.waybillId == null) {
            setForm(assignFillingWaybill(handleWaybillFormOpen, handleInvoiceInfoOpen));
            setWaybillFillDialogOpen(true);
        } else {
            handleInvoiceInfoOpen();
        }
    };

    const handleInvoiceInfoOpen = () => {
        setForm(<InvoiceInfo invoiceId={foundInvoice.id}/>);
        setWaybillFillDialogOpen(false);
        setInvoiceInfoDialogOpen(true);
    }

    const handleWaybillFormOpen = () => {
        setWaybillFillDialogOpen(false);
        setWaybillDialogOpen(true);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClose = () => {
        setWaybillFillDialogOpen(false);
        setInvoiceInfoDialogOpen(false);
        setWaybillDialogOpen(false);
    };

    return (
        <div>
            <Paper>
                <TableContainer>
                    <Typography variant="h5" gutterBottom style={{textAlign: "left", margin: 15}}>
                        Invoices
                    </Typography>
                    <Table aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{minWidth: column.minWidth, fontSize: 18, color: "#3f51b5"}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((invoice) => {
                                    return (
                                        <TableRow
                                            onClick={() => {
                                                handleTableRowClick(invoice);
                                            }}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={invoice.id}
                                        >
                                            {columns.map((column) => {
                                                const value = fetchFieldFromObject(invoice, column.id);
                                                return (
                                                    <TableCell key={column.id}>
                                                        {column.format && typeof value === "number"
                                                            ? column.format(value)
                                                            : value}
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
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={invoices.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <WaybillDialog
                    open={waybillDialogOpen}
                    invoiceId={invoice.id}
                    onClose={() => {
                        setWaybillDialogOpen(false);
                        setInvoice({id: 0, invoiceStatus: "", waybillId: ""});
                        fetchInvoices();
                    }}
                    onSubmit={() => {
                        setWaybillDialogOpen(false);
                        setInvoice({id: 0, invoiceStatus: "", waybillId: ""});
                        fetchInvoices();
                    }}
                />

                <DialogWindow
                    dialogTitle="Confirmation"
                    handleClose={handleClose}
                    openDialog={waybillFillDialogOpen}
                    form={form}
                />

                <DialogWindow
                    dialogTitle="Invoice Info"
                    fullWidth={true}
                    maxWidth="md"
                    handleClose={handleClose}
                    openDialog={invoiceInfoDialogOpen}
                    form={form}
                />
            </Paper>
        </div>
    );
}