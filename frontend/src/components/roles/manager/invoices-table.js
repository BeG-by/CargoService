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
import {FillWaybillDialog} from "../../parts/dialogs/fill-waybill";
import {DialogWindow} from "../../parts/dialogs/dialog";
import {Typography} from "@material-ui/core";
import {InvoiceInfo} from "./invoice-info";
import CheckIcon from '@material-ui/icons/Check';
import fetchFieldFromObject from "../../parts/util/fetch-field-from-object";
import {connect} from "react-redux";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from "@material-ui/core/Button";
import {handleRequestError, INVOICE_URL, makeRequest, MANAGER_INVOICES_URL} from "../../parts/util/request-util";
import {NotAuthorized} from "../../pages/error-page/error-401";

const ALIGN = "left";

const columns = [
    {id: "number", label: "Invoice #", minWidth: 100, align: ALIGN},
    {id: "status", label: "Status", minWidth: 100, align: ALIGN},
    {id: "date", label: "Date of registration", minWidth: 150, format: (value) => value.toFixed(2), align: ALIGN},
    {id: "waybillId", label: "Waybill", minWidth: 100, align: "center"}
];

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const InvoicesTable = connect(mapStateToProps)((props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [invoices, setInvoices] = React.useState([]);
    const [invoice, setInvoice] = React.useState({id: 0, waybill: null, invoiceStatus: "", number: ""});
    const [form, setForm] = React.useState(null);
    const [waybillFillDialogOpen, setWaybillFillDialogOpen] = React.useState(false);
    const [waybillDialogOpen, setWaybillDialogOpen] = React.useState(false);
    const [invoiceInfoDialogOpen, setInvoiceInfoDialogOpen] = React.useState(false);
    const role = props.role;

    async function fetchInvoices(cleanupFunction) {
        if (!cleanupFunction) {
            let response = await makeRequest("GET", MANAGER_INVOICES_URL + "?requestedPage=0&invoicesPerPage=20");
            setInvoices(response.data.invoices);
        }
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchInvoices(cleanupFunction)
            .catch((err) => {
                setInvoices([]);
                handleRequestError(err, alert); // TODO notification
            });
        return () => cleanupFunction = true;
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // TODO again two requests.

    let foundInvoice = {};
    const handleTableRowClick = async (invoice) => {
        let response = await makeRequest("GET", INVOICE_URL + "/" + invoice.id);
        foundInvoice = response.data;
        setInvoice(() => ({
            id: foundInvoice.id,
            status: foundInvoice.status,
            waybill: foundInvoice.waybill,
            number: foundInvoice.number,
        }));
        if (foundInvoice.status === "ACCEPTED"
            && foundInvoice.waybill === null) {
            setForm(FillWaybillDialog(handleWaybillFormOpen, handleInvoiceInfoOpen));
            setWaybillFillDialogOpen(true);
        } else {
            handleInvoiceInfoOpen();
        }
    };

    const handleInvoiceInfoOpen = () => {
        setForm(<InvoiceInfo invoiceId={foundInvoice.id}/>);
        setWaybillFillDialogOpen(false);
        setInvoiceInfoDialogOpen(true);
    };

    const handleWaybillFormOpen = () => {
        setWaybillFillDialogOpen(false);
        setWaybillDialogOpen(true);
    };

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
        role === "UNKNOWN" ? <NotAuthorized/> :
        <main>
            <Paper className="table-paper">
                <TableContainer className="table-container">
                    <div className="table-header-wrapper">
                        <Typography variant="h5" gutterBottom>
                            Invoices
                        </Typography>
                    </div>
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
                                <TableCell
                                    key={"edit-delete"}
                                    style={{minWidth: 60}}
                                />
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
                                                        {column.id === 'waybillId' && value !== null
                                                            ? <CheckIcon/>
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell>
                                                <div className="table-delete-edit-div">
                                                    <Button
                                                        className="menu-table-btn"
                                                        color={"primary"}
                                                        startIcon={<VisibilityIcon/>}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTableRowClick(invoice)
                                                        }}/>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component="div"
                    count={invoices.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <WaybillDialog
                    invoice={invoice}
                    open={waybillDialogOpen}
                    onClose={() => {
                        setWaybillDialogOpen(false);
                        fetchInvoices(false)
                            .catch((err) => {
                                setInvoices([]);
                                handleRequestError(err);
                            });
                    }}
                />

                <DialogWindow
                    dialogTitle="Confirmation"
                    handleClose={handleClose}
                    openDialog={waybillFillDialogOpen}
                    form={form}
                />

                <DialogWindow
                    dialogTitle={"Invoice # " + invoice.number}
                    fullWidth={true}
                    maxWidth="xl"
                    handleClose={handleClose}
                    openDialog={invoiceInfoDialogOpen}
                    form={form}
                />
            </Paper>
        </main>
    );
});


export default InvoicesTable;
