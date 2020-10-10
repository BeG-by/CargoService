import React, {useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
    DRIVER_WAYBILL_URL,
    handleRequestError,
    makeRequest,
    MANAGER_WAYBILL_URL,
    WAYBILL_URL
} from "../../parts/util/request-util";
import {DialogWindow} from "../../parts/dialogs/dialog";
import {Typography} from "@material-ui/core";
import {WaybillInfo} from "./waybill-info";
import fetchFieldFromObject from "../../parts/util/function-util";
import {FillActDialog} from "../../parts/dialogs/fill-act";
import ActDialog from "./act-dialog";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EnhancedTableHead, {getComparator, stableSort} from "../../parts/util/sorted-table-head";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Tooltip from "@material-ui/core/Tooltip";
import PostAddIcon from "@material-ui/icons/PostAdd";
import TextSearch from "../../parts/search/text-search";

const LEFT = "left";
const CENTER = "center";
const SIZE = 18;

const columns = [
    {id: "registrationDate", label: "Registration Date", minWidth: 150, align: CENTER, fontSize: SIZE},
    {id: "auto", label: "Auto", minWidth: 100, align: LEFT, fontSize: SIZE},
    {id: "departureDate", label: "Departure Date", minWidth: 150, align: CENTER, fontSize: SIZE},
    {id: "arrivalDate", label: "Arrival Date", minWidth: 150, align: CENTER, fontSize: SIZE},
    {id: "invoiceNumber", label: "Invoice #", minWidth: 100, align: LEFT, fontSize: SIZE},
    {id: "status", label: "Waybill Status", minWidth: 150, align: CENTER, fontSize: SIZE},
];

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const WaybillsTable = connect(mapStateToProps)((props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalWaybillsAmount, setTotalWaybillsAmount] = React.useState(0);

    const [waybills, setWaybills] = React.useState([]);
    const [waybill, setWaybill] = React.useState({id: 0, invoice: {}});
    const [actFillDialogOpen, setActFillDialogOpen] = React.useState(false);
    const [actDialogOpen, setActDialogOpen] = React.useState(false);
    const [waybillInfoDialogOpen, setWaybillInfoDialogOpen] = React.useState(false);
    const [form, setForm] = React.useState(null);
    const role = props.role;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('status');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    async function fetchWaybills(cleanupFunction, curPage = page, curRowsPerPage = rowsPerPage, searchStr = null) {
        if (!cleanupFunction) {
            let url = "";
            if (role === "DRIVER") {
                url = `${DRIVER_WAYBILL_URL}?page=${curPage}&waybillsPerPage=${curRowsPerPage}`
            } else if (role === "MANAGER") {
                url = `${MANAGER_WAYBILL_URL}?page=${curPage}&waybillsPerPage=${curRowsPerPage}`
            } else {
                alert("Unrecognized role, waybills can watch only manager and driver")
                return;
            }

            if (searchStr !== null) {
                url += `&invoiceNumber=${searchStr}`
            }

            let response = await makeRequest("GET", url);
            setTotalWaybillsAmount(response.data.totalAmount);
            let data = response.data.waybills;
            data.forEach(waybill => {
                let checkPassage = true;
                let checkLosses = true;
                if (!waybill.points) {
                    checkPassage = false;
                } else {
                    waybill.points.forEach(p => {
                        if (!p.passed) {
                            checkPassage = false;
                        }
                    });
                }
                waybill.invoice.products.forEach(p => {
                    if (p.lostQuantity > 0) {
                        checkLosses = false;
                    }
                });
                waybill.checkPassage = checkPassage;
                waybill.checkLosses = checkLosses;
            })
            setWaybills(data);
        }
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchWaybills(cleanupFunction)
            .catch((err) => {
                setWaybills([]);
                handleRequestError(err, alert); // TODO toast
            });
        return () => cleanupFunction = true;
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchWaybills(false, newPage);
    };

    const handleTableRowClick = async (wb) => {
        let response = await makeRequest("GET", WAYBILL_URL + "/" + wb.id);
        const data = response.data;
        setWaybill(() => ({
            id: data.id,
            invoice: data.invoice,
        }));
        handleWaybillInfoOpen(data.id);
    };

    const handleTextSearchChange = (searchStr) => {
        if (searchStr !== "")
            fetchWaybills(false, page, rowsPerPage, searchStr);
        else
            fetchWaybills(false);
    }

    const handleWaybillInfoOpen = (id) => {
        setForm(<WaybillInfo waybillId={id} onSave={fetchWaybills}/>);
        setActFillDialogOpen(false);
        setWaybillInfoDialogOpen(true);
    }

    const handleActFormOpen = () => {
        setActFillDialogOpen(false);
        setActDialogOpen(true);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        fetchWaybills(false, 0, +event.target.value)
    };

    const handleClose = () => {
        setActFillDialogOpen(false);
        setWaybillInfoDialogOpen(false);
        setActDialogOpen(false);
    };

    const handleActFill = async (wb) => {
        let response = await makeRequest("GET", WAYBILL_URL + "/" + wb.id);
        const data = response.data;
        setWaybill(() => ({
            id: data.id,
            invoice: data.invoice,
        }));
        setForm(FillActDialog(handleActFormOpen, handleClose));
        setActFillDialogOpen(true);
    }

    return (
        <main>
            <Paper className="table-paper main-table-paper">
                <div className="table-header-wrapper">
                    <Typography variant="button" display="block" gutterBottom
                                style={{fontSize: 26, marginLeft: 15, marginTop: 15, textDecoration: "underline"}}>
                        <LibraryBooksIcon/>
                        Waybills
                    </Typography>
                    <TextSearch onFieldChange={handleTextSearchChange}/>
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
                            {stableSort(waybills, getComparator(order, orderBy))
                                .map((waybill) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={waybill.id}
                                        >
                                            <TableCell>
                                                {waybill.checkPassage
                                                && waybill.checkLosses
                                                && waybill.invoice.status !== "CLOSED"
                                                && waybill.invoice.status !== "CLOSED_WITH_ACT"
                                                && role === "DRIVER"
                                                    ? <Tooltip title="Click to fill in act of losses"
                                                               arrow
                                                               className="table-delete-edit-div">
                                                        <Button
                                                            className="menu-table-btn"
                                                            color={"secondary"}
                                                            startIcon={<PostAddIcon/>}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleActFill(waybill);
                                                            }}/>
                                                    </Tooltip>
                                                    : waybill.status === "CURRENT"
                                                    && role === "DRIVER"
                                                        ? <Tooltip title="Current waybill"
                                                                   arrow
                                                                   className="table-delete-edit-div">
                                                            <Button
                                                                className="menu-table-btn"
                                                                color={"secondary"}
                                                                startIcon={<ArrowForwardIcon/>}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleTableRowClick(waybill);
                                                                }}/>
                                                        </Tooltip>
                                                        : null
                                                }
                                            </TableCell>
                                            {columns.map((column) => {
                                                const value = fetchFieldFromObject(waybill, column.id);
                                                return (
                                                    <TableCell key={column.id}
                                                               align={column.align}
                                                               style={{
                                                                   minWidth: column.minWidth,
                                                                   maxWidth: column.maxWidth
                                                               }}>
                                                        {column.id === "invoiceNumber"
                                                            ? waybill.invoice.number
                                                            : column.id === "registrationDate"
                                                                ? waybill.invoice.checkingDate
                                                                : column.id === "status"
                                                                && value === "FUTURE"
                                                                    ? <div style={{
                                                                        color: "royalblue",
                                                                        border: "1px solid royalblue",
                                                                        padding: 3,
                                                                        borderRadius: 5
                                                                    }}>{waybill.status}</div>
                                                                    : column.id === "status"
                                                                    && (value === "DONE")
                                                                        ? <div style={{
                                                                            color: "black",
                                                                            border: "1px solid black",
                                                                            padding: 3,
                                                                            borderRadius: 5
                                                                        }}>{waybill.status}</div>
                                                                        : column.id === "status"
                                                                        && (value === "CURRENT")
                                                                            ? <div style={{
                                                                                color: "crimson",
                                                                                border: "1px solid crimson",
                                                                                padding: 3,
                                                                                borderRadius: 5
                                                                            }}>{waybill.status}</div>
                                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell>
                                                <Tooltip title="Click to see waybill info"
                                                         arrow
                                                         className="table-delete-edit-div">
                                                    <Button
                                                        className="menu-table-btn"
                                                        color={"primary"}
                                                        startIcon={<VisibilityIcon/>}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTableRowClick(waybill)
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
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={totalWaybillsAmount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <ActDialog
                    waybill={waybill}
                    open={actDialogOpen}
                    onClose={() => {
                        setActDialogOpen(false);
                    }}
                    onSave={() => {
                        fetchWaybills(false)
                            .catch((err) => {
                                setWaybills([]);
                                handleRequestError(err);
                            });
                    }}
                />

                <DialogWindow
                    dialogTitle="Confirmation"
                    handleClose={handleClose}
                    openDialog={actFillDialogOpen}
                    form={form}
                />

                <DialogWindow
                    dialogTitle={"Waybill to invoice # " + waybill.invoice.number}
                    fullWidth={true}
                    maxWidth="xl"
                    handleClose={handleClose}
                    openDialog={waybillInfoDialogOpen}
                    form={form}
                />

            </Paper>
        </main>
    );
})