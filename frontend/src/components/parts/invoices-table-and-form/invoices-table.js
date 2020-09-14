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
import {getAllInvoices} from "./request-utils";
import {assignFillingWaybill} from "../dialogs/fill-waybill";
import {DialogWindow} from "../dialog";
import Button from "@material-ui/core/Button";
import InvoiceDialog from "./invoice-dialog";

const columns = [
    {id: "number", label: "#", minWidth: 150},
    {id: "status", label: "Status", minWidth: 200},
    {
        id: "date",
        label: "Registration Date",
        minWidth: 200,
        align: "center",
        format: (value) => value.toFixed(2),
    },
    {id: "waybill", label: "Waybill", minWidth: 150},
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
    const [form, setForm] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [waybillDialogOpen, setWaybillDialogOpen] = React.useState(false);
    const [invoiceDialogOpen, setInvoiceDialogOpen] = React.useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = React.useState(0);

    async function fetchInvoices() {
        setInvoices(await getAllInvoices());
    }

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleTableRowClick = (invoice) => {
        setSelectedInvoiceId(invoice.id);
        if (invoice.status === "ACCEPTED" && !invoice.waybill.trim()) {
            setForm(assignFillingWaybill(handleWaybillFormOpen));
            setOpenDialog(true);
        } else {
            window.location.href = "/invoice";
        }
    };

    const handleWaybillFormOpen = () => {
        setOpenDialog(false);
        setWaybillDialogOpen(true);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleCreateNewInvoiceCLick = () => {
        setInvoiceDialogOpen(true);
    };

    return (
        <div>
            <Paper>
                <TableContainer>
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
                                                    <TableCell key={column.id} align={column.align}>
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
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={invoices.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <WaybillDialog
                    open={waybillDialogOpen}
                    invoiceId={selectedInvoiceId}
                    onClose={() => {
                        setWaybillDialogOpen(false);
                        setSelectedInvoiceId(0);
                        fetchInvoices();
                    }}
                    onSubmit={() => {
                        setWaybillDialogOpen(false);
                        setSelectedInvoiceId(0);
                        fetchInvoices();
                    }}
                />

                <InvoiceDialog
                    open={invoiceDialogOpen}

                    onDelete={() => {
                        setInvoiceDialogOpen(false);
                        fetchInvoices();
                    }}
                    onClose={() => {
                        setInvoiceDialogOpen(false);
                        fetchInvoices();
                    }}
                    onSubmit={() => {
                        setInvoiceDialogOpen(false);
                        fetchInvoices();
                    }}
                />

                <Button
                    onClick={handleCreateNewInvoiceCLick}
                    variant="contained"
                    color="primary"
                >
                    Add new invoice
                </Button>
                <DialogWindow
                        dialogTitle="Confirmation"
                        handleClose={handleClose}
                        openDialog={openDialog}
                        form={form}
                      />
            </Paper>
        </div>
    );
}
//fixme (связать InvoiceDialog с invoice-creating-form.js, которая сейчас возвращает диалог)