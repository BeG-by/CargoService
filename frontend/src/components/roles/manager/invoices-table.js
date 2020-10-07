import React, {useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import WaybillDialog from "./waybill-dialog";
import {FillWaybillDialog} from "../../parts/dialogs/fill-waybill";
import {DialogWindow} from "../../parts/dialogs/dialog";
import {Typography} from "@material-ui/core";
import {InvoiceInfo} from "./invoice-info";
import CheckIcon from '@material-ui/icons/Check';
import fetchFieldFromObject from "../../parts/util/function-util";
import {connect} from "react-redux";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from "@material-ui/core/Button";
import {handleRequestError, INVOICE_URL, makeRequest} from "../../parts/util/request-util";
import {NotAuthorized} from "../../pages/error-page/error-401";
import EnhancedTableHead, {getComparator, stableSort} from "../../parts/util/sorted-table-head";
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import PostAddIcon from '@material-ui/icons/PostAdd';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import CloseIcon from '@material-ui/icons/Close';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const LEFT = "left";
const CENTER = "center";
const SIZE = 18;

const columns = [
    {id: "number", label: "Invoice #", minWidth: 100, align: LEFT, fontSize: SIZE},
    {id: "status", label: "Status", minWidth: 100, align: LEFT, fontSize: SIZE},
    {id: "date", label: "Date of registration", minWidth: 150, align: CENTER, fontSize: SIZE},
    {id: "shipper", label: "Shipper", minWidth: 300, align: LEFT, fontSize: SIZE},
    {id: "consignee", label: "Consignee", minWidth: 300, align: LEFT, fontSize: SIZE},
    {id: "waybillId", label: "Waybill", minWidth: 100, align: CENTER, fontSize: SIZE}
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
    const [selectedInvoice, setSelectedInvoice] = React.useState({});
    const [form, setForm] = React.useState(null);
    const [waybillFillDialogOpen, setWaybillFillDialogOpen] = React.useState(false);
    const [waybillDialogOpen, setWaybillDialogOpen] = React.useState(false);
    const [invoiceInfoDialogOpen, setInvoiceInfoDialogOpen] = React.useState(false);
    const role = props.role;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('status');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    async function fetchInvoices(cleanupFunction) {
        if (!cleanupFunction) {
            let response = await makeRequest("GET", INVOICE_URL);
            setInvoices(response.data);
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

    const handleTableRowClick = (invoice) => {
        setSelectedInvoice(invoice);
        handleInvoiceInfoOpen(invoice.id);
    };

    const handleInvoiceInfoOpen = (id) => {
        setForm(<InvoiceInfo invoiceId={id}/>);
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

    const handleWaybillFillClick = (invoice) => {
        setSelectedInvoice(invoice);
        setForm(FillWaybillDialog(handleWaybillFormOpen, handleClose));
        setWaybillFillDialogOpen(true);
    }

    return (
        role === "UNKNOWN" ? <NotAuthorized/> :
            <main>
                <Paper className="table-paper main-table-paper">
                    <div className="table-header-wrapper">
                        <Typography variant="button" display="block" gutterBottom
                                    style={{fontSize: 26, marginLeft: 15, marginTop: 15, textDecoration: "underline"}}>
                            <LibraryBooksIcon/>
                            Invoices
                        </Typography>
                    </div>

                    <TableContainer className="table-container">
                        <Table aria-label="sticky table">
                            <EnhancedTableHead
                                firstMenu={true}
                                secondMenu={true}
                                columns={columns}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(invoices, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((invoice) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={invoice.id}
                                            >
                                                <TableCell>
                                                    {invoice.status === "REJECTED"
                                                    && role === "DISPATCHER"
                                                        ? <Tooltip title="Click to edit invoice"
                                                                   arrow
                                                                   className="table-delete-edit-div">
                                                            <Button
                                                                className="menu-table-btn"
                                                                color={"secondary"}
                                                                startIcon={<EditIcon/>}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleTableRowClick(invoice);
                                                                }}/>
                                                        </Tooltip>
                                                        : invoice.status === "ACCEPTED"
                                                        && invoice.waybillId === null
                                                        && role === "MANAGER"
                                                            ? <Tooltip title="Click to fill in waybill"
                                                                       arrow
                                                                       className="table-delete-edit-div">
                                                                <Button
                                                                    className="menu-table-btn"
                                                                    color={"primary"}
                                                                    startIcon={<PostAddIcon/>}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleWaybillFillClick(invoice);
                                                                    }}/>
                                                            </Tooltip>
                                                            : invoice.status === "REGISTERED"
                                                            && role === "MANAGER"
                                                                ? <Tooltip title="Click to verify invoice"
                                                                           arrow
                                                                           className="table-delete-edit-div">
                                                                    <Button
                                                                        className="menu-table-btn"
                                                                        color={"secondary"}
                                                                        startIcon={<ZoomInIcon/>}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleTableRowClick(invoice);
                                                                        }}/>
                                                                </Tooltip>
                                                                : invoice.status === "ACCEPTED"
                                                                && invoice.waybillId !== null
                                                                && role === "DRIVER"
                                                                    // && invoice.checkPassage //fixme проверить возможность закрытия
                                                                    ? <Tooltip title="Click to close invoice"
                                                                               arrow
                                                                               className="table-delete-edit-div">
                                                                        <Button
                                                                            className="menu-table-btn"
                                                                            color={"secondary"}
                                                                            startIcon={<CloseIcon/>}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleTableRowClick(invoice)
                                                                            }}/>
                                                                    </Tooltip>
                                                                    : null
                                                    }
                                                </TableCell>
                                                {columns.map((column) => {
                                                    const value = fetchFieldFromObject(invoice, column.id);
                                                    return (
                                                        <TableCell key={column.id}
                                                                   align={column.align}
                                                                   style={{
                                                                       minWidth: column.minWidth,
                                                                       maxWidth: column.maxWidth
                                                                   }}>
                                                            {column.id === 'waybillId'
                                                            && value !== null
                                                                ? <CheckIcon/>
                                                                : column.id === "status"
                                                                && value === "ACCEPTED"
                                                                    ? <div style={{
                                                                        color: "royalblue",
                                                                        border: "1px solid royalblue",
                                                                        padding: 3,
                                                                        borderRadius: 5
                                                                    }}>{value}</div>
                                                                    : column.id === "status"
                                                                    && value === "REGISTERED"
                                                                        ? <div style={{
                                                                            color: "green",
                                                                            border: "1px solid green",
                                                                            padding: 3,
                                                                            borderRadius: 5
                                                                        }}>{value}</div>
                                                                        : column.id === "status"
                                                                        && value === "REJECTED"
                                                                            ? <div style={{
                                                                                color: "crimson",
                                                                                border: "1px solid crimson",
                                                                                padding: 3,
                                                                                borderRadius: 5
                                                                            }}>{value}</div>
                                                                            : column.id === "status"
                                                                            && (value === "CLOSED"
                                                                                || value === "CLOSED_WITH_ACT")
                                                                                ? <div style={{
                                                                                    color: "black",
                                                                                    border: "1px solid black",
                                                                                    padding: 3,
                                                                                    borderRadius: 5
                                                                                }}>{value}</div>
                                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell>
                                                    <Tooltip title="Click to see invoice info"
                                                             arrow
                                                             className="table-delete-edit-div">
                                                        <Button
                                                            className="menu-table-btn"
                                                            color={"primary"}
                                                            startIcon={<VisibilityIcon/>}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleTableRowClick(invoice)
                                                            }}/>
                                                    </Tooltip>
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
                        invoice={selectedInvoice}
                        open={waybillDialogOpen}
                        onClose={() => {
                            setWaybillDialogOpen(false);
                        }}
                        onSave={() => {
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
                        dialogTitle={"Invoice # " + selectedInvoice.number}
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
