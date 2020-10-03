import React, {useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
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

const ALIGN = "left";

const columns = [
    {id: "invoiceNumber", label: "Invoice #", minWidth: 100, align: ALIGN},
    {id: "status", label: "Invoice status", minWidth: 150, align: ALIGN},
    {id: "auto", label: "Auto", minWidth: 100, align: ALIGN},
    {id: "departureDate", label: "Departure Date", minWidth: 150, align: ALIGN},
    {id: "arrivalDate", label: "Arrival Date", minWidth: 150, align: ALIGN},
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
    const [form, setForm] = React.useState(null);
    const [actFillDialogOpen, setActFillDialogOpen] = React.useState(false);
    const [actDialogOpen, setActDialogOpen] = React.useState(false);
    const [waybillInfoDialogOpen, setWaybillInfoDialogOpen] = React.useState(false);


    async function fetchWaybills(cleanupFunction) {
        if (!cleanupFunction) {
            let response = await makeRequest("GET", WAYBILL_URL);
            setWaybills(response.data);
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

    let foundWaybill = {};
    let checkPassage = true;
    let checkLosses = true;

    //TODO question. Second request ?

    const handleTableRowClick = async (wb) => {
        let response = await makeRequest("GET", WAYBILL_URL + "/" + wb.id);
        foundWaybill = response.data;
        foundWaybill.points.forEach(p => {
            if (!p.passed) {
                checkPassage = false;
            }
        });
        foundWaybill.invoice.products.forEach(p => {
            if (p.lostQuantity > 0) {
                checkLosses = false;
            }
        })
        setWaybill(() => ({
            id: foundWaybill.id,
            invoice: foundWaybill.invoice,
        }));
        if (checkPassage
            && checkLosses
            && foundWaybill.invoice.status !== "CLOSED"
            && foundWaybill.invoice.status !== "CLOSED_WITH_ACT") {
            setForm(FillActDialog(handleActFormOpen, handleWaybillInfoOpen));
            setActFillDialogOpen(true);
        } else {
            handleWaybillInfoOpen();
        }
    };

    const handleWaybillInfoOpen = () => {
        setForm(<WaybillInfo waybillId={foundWaybill.id}/>);
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

    return (
        <main>
            <Paper className="table-paper">
                <TableContainer className="table-container">
                    <div className="table-header-wrapper">
                        <Typography variant="h5" gutterBottom>
                            Waybills
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
                            {waybills
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((waybill) => {
                                    return (
                                        <TableRow
                                            onClick={() => {
                                                handleTableRowClick(waybill);
                                            }}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={waybill.id}
                                        >
                                            {columns.map((column) => {
                                                const value = fetchFieldFromObject(waybill, column.id);
                                                return (
                                                    <TableCell key={column.id}>
                                                        {value}
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
                                                            handleTableRowClick(waybill)
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
                    maxWidth="md"
                    handleClose={handleClose}
                    openDialog={waybillInfoDialogOpen}
                    form={form}
                />

            </Paper>
        </main>
    );
})