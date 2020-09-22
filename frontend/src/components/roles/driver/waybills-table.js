import React, {useEffect} from "react";
import interceptors from "../../src/security/Interceptors";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import WaybillDialog from "../manager/waybill-dialog";
import {getAllInvoices, getInvoiceById} from "./request-utils";
import {DialogWindow} from "../../parts/layout/dialog";
import {Typography} from "@material-ui/core";
import {WaybillInfo} from "./waybill-info";

const columns = [
    {id: "number", label: "Invoice #", minWidth: 100},
    {id: "driver", label: "Driver", minWidth: 100},
    {
        id: "departureDate",
        label: "Departure Date",
        minWidth: 150,
    },
    {
        id: "arrivalDate",
        label: "Arrival Date",
        minWidth: 150,
    },
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

export default function WaybillsTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [invoices, setInvoices] = React.useState([]);
    const [invoice, setInvoice] = React.useState({id: 0, waybillId: "", invoiceStatus: ""});
    const [form, setForm] = React.useState(null);
    const [waybillFillDialogOpen, setWaybillFillDialogOpen] = React.useState(false);
    const [waybillDialogOpen, setWaybillDialogOpen] = React.useState(false);
    const [waybillInfoDialogOpen, setWaybillInfoDialogOpen] = React.useState(false);

    async function fetchInvoices(cleanupFunction) {
        if (!cleanupFunction) setInvoices(await getAllInvoices());
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchInvoices(cleanupFunction);
        return () => cleanupFunction = true;
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleTableRowClick = async (inv) => {
        let selected = await getInvoiceById(inv.id);
        setInvoice({
            id: selected.id,
            invoiceStatus: selected.invoiceStatus,
            waybillId: selected.waybillId,
        });

        setForm(<WaybillInfo waybillId={waybill.id}/>);
        setWaybillInfoDialogOpen(true);
    };



    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClose = () => {
        setWaybillInfoDialogOpen(false);
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