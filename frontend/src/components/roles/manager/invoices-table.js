import React, {useEffect, useState} from "react";
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
import {
    DISPATCHER_INVOICES_URL,
    DRIVER_INVOICES_URL,
    handleRequestError,
    INVOICE_URL,
    makeRequest,
    MANAGER_INVOICES_URL
} from "../../parts/util/request-util";
import {NotAuthorized} from "../../pages/error-page/error-401";
import useToast from "../../parts/toast-notification/useToast";
import TextSearch from "../../parts/search/text-search";

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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchNumber, setSearchNumber] = useState("");
    const [ToastComponent, openToast] = useToast();
    const [invoices, setInvoices] = useState([]);
    const [invoice, setInvoice] = useState({id: 0, waybill: null, invoiceStatus: "", number: ""});
    const [form, setForm] = useState(null);
    const [waybillFillDialogOpen, setWaybillFillDialogOpen] = useState(false);
    const [waybillDialogOpen, setWaybillDialogOpen] = useState(false);
    const [invoiceInfoDialogOpen, setInvoiceInfoDialogOpen] = useState(false);
    const role = props.role;

    async function fetchInvoices(cleanupFunction = false,
                                 currentPage = page,
                                 currentRowsPerPage = rowsPerPage,
                                 invoiceNumber = "") {

        if (!cleanupFunction) {
            let params = `?requestedPage=${currentPage}&invoicesPerPage=${currentRowsPerPage}`;
            if (invoiceNumber !== "") {
                params += `&number=${invoiceNumber}`;
            }

            try {
                switch (role) {
                    case "MANAGER":
                        await fetchInvoicesForManager(params);
                        break;
                    case "DRIVER":
                        await fetchInvoicesForDriver(params);
                        break;
                    case "DISPATCHER":
                        await fetchInvoicesForDispatcher(params);
                        break;
                }
            } catch (err) {
                setInvoices([]);
                handleRequestError(err, openToast);
            }
        }
    }

    const fetchInvoicesForManager = async (params) => {
        let response = await makeRequest("GET", `${MANAGER_INVOICES_URL}${params}`);
        setInvoices(response.data.invoices);
    }

    const fetchInvoicesForDriver = async (params) => {
        let response = await makeRequest("GET", `${DRIVER_INVOICES_URL}${params}`);
        setInvoices(response.data.invoices);
    }

    const fetchInvoicesForDispatcher = async (params) => {
        let response = await makeRequest("GET", `${DISPATCHER_INVOICES_URL}${params}`);
        setInvoices(response.data.invoices);
    }


    useEffect(() => {
        let cleanupFunction = false;
        fetchInvoices(cleanupFunction)
        return () => cleanupFunction = true;
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchInvoices(false, newPage)
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
        fetchInvoices(false, 0, +event.target.value)
    };

    const handleClose = () => {
        setWaybillFillDialogOpen(false);
        setInvoiceInfoDialogOpen(false);
        setWaybillDialogOpen(false);
    };

    const handleSearchFieldChange = (searchNumber) => {
        fetchInvoices(false, page, rowsPerPage, searchNumber);
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
                            <TextSearch
                                onFieldChange={handleSearchFieldChange}
                            />
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
                {ToastComponent}
            </main>
    );
});


export default InvoicesTable;
