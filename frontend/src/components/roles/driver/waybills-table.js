import React, {useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {handleRequestError, makeRequest, WAYBILL_URL} from "../../parts/util/request-util";
import {DialogWindow} from "../../parts/dialogs/dialog";
import {Typography} from "@material-ui/core";
import {WaybillInfo} from "./waybill-info";
import fetchFieldFromObject from "../../parts/util/fetch-field-from-object";
import {FillActDialog} from "../../parts/dialogs/fill-act";
import ActDialog from "./act-dialog";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {NotAuthorized} from "../../pages/error-page/error-401";
import EnhancedTableHead, {getComparator, stableSort} from "../../parts/util/sorted-table-head";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Tooltip from "@material-ui/core/Tooltip";
import PostAddIcon from "@material-ui/icons/PostAdd";

const LEFT = "left";
const CENTER = "center";
const SIZE = 18;

const columns = [
    {id: "invoiceNumber", label: "Invoice #", minWidth: 100, align: LEFT, fontSize: SIZE},
    {id: "status", label: "Invoice status", minWidth: 150, align: CENTER, fontSize: SIZE},
    {id: "auto", label: "Auto", minWidth: 100, align: LEFT, fontSize: SIZE},
    {id: "departureDate", label: "Departure Date", minWidth: 150, align: CENTER, fontSize: SIZE},
    {id: "arrivalDate", label: "Arrival Date", minWidth: 150, align: CENTER, fontSize: SIZE},
];

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const WaybillsTable = connect(mapStateToProps)((props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
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

    async function fetchWaybills(cleanupFunction) {
        if (!cleanupFunction) {
            let response = await makeRequest("GET", WAYBILL_URL);
            let data = response.data;
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
    };


    //TODO question. Second request ?

    const handleTableRowClick = async (wb) => {
        let response = await makeRequest("GET", WAYBILL_URL + "/" + wb.id);
        const data = response.data;
        setWaybill(() => ({
            id: data.id,
            invoice: data.invoice,
        }));
        handleWaybillInfoOpen(data.id);
    };

    const handleWaybillInfoOpen = (id) => {
        setForm(<WaybillInfo waybillId={id}/>);
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
        role === "UNKNOWN" ? <NotAuthorized/> :
            <main>
                <Paper className="table-paper main-table-paper">
                    <div className="table-header-wrapper">
                        <Typography variant="button" display="block" gutterBottom
                                    style={{fontSize: 26, marginLeft: 15, marginTop: 15, textDecoration: "underline"}}>
                            <LibraryBooksIcon/>
                            Waybills
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
                                {stableSort(waybills, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                                : column.id === "status"
                                                                    ? waybill.invoice.status
                                                                    : value}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell>
                                                    <Tooltip title="Click to fill in act of losses"
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
                        count={waybills.length}
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