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
import {getAllInvoices, getDriverById, getInvoiceById} from "./request-utils";
import {assignFillingWaybill} from "../dialogs/fill-waybill";
import {DialogWindow} from "../dialog";
import Button from "@material-ui/core/Button";
import InvoiceDialog from "./invoice-dialog";
import {setIn} from "formik";

const columns = [
    {id: "number", label: "#", minWidth: 150},
    {id: "status", label: "Status", minWidth: 200},
    {
        id: "date",
        label: "Registration Date",
        minWidth: 200,
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
    const [invoice, setInvoice] = React.useState({id: 0, waybillId: "", invoiceStatus: ""});
    const [form, setForm] = React.useState(null);
    const [waybillFillDialogOpen, setWaybillFillDialogOpen] = React.useState(false);
    const [waybillDialogOpen, setWaybillDialogOpen] = React.useState(false);
    const [invoiceDialogOpen, setInvoiceDialogOpen] = React.useState(false);

    async function fetchInvoices() {
        setInvoices(await getAllInvoices());
    }

    useEffect(() => {
        fetchInvoices();
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
        localStorage.setItem("invoice", selected.id); //fixme передать в общем стэйте
        if (invoice.invoiceStatus === "ACCEPTED" && !invoice.waybillId.trim()) {
            setForm(assignFillingWaybill(handleWaybillFormOpen));
            setWaybillFillDialogOpen(true);
        } else {
            window.location.href = "/invoice";
        }
    };

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

                <Button
                    onClick={handleCreateNewInvoiceCLick}
                    variant="contained"
                    color="primary"
                    style={{margin: 20}}
                >
                    Add new invoice
                </Button>

                <DialogWindow
                        dialogTitle="Confirmation"
                        handleClose={handleClose}
                        openDialog={waybillFillDialogOpen}
                        form={form}
                      />
            </Paper>
        </div>
    );
}
//fixme (связать InvoiceDialog с invoice-creating-form.js, которая сейчас возвращает диалог)

// <InvoiceDialog
//     open={invoiceDialogOpen}
//     invoice={invoice}
//     onDelete={() => {
//         setInvoiceDialogOpen(false);
//         fetchInvoices();
//     }}
//     onClose={() => {
//         setInvoiceDialogOpen(false);
//         fetchInvoices();
//     }}
//     onSubmit={() => {
//         setInvoiceDialogOpen(false);
//         fetchInvoices();
//     }}
// />
