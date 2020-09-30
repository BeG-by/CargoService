import React, {useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {getAllWaybills, getWaybillById} from "./request-utils";
import {DialogWindow} from "../../parts/dialogs/dialog";
import {Typography} from "@material-ui/core";
import {WaybillInfo} from "./waybill-info";
import fetchFieldFromObject from "../../forms/fetch-field-from-object";
import {FillActDialog} from "../../parts/dialogs/fill-act";
import ActDialog from "./act-dialog";
import {connect} from "react-redux";

const columns = [
    {id: "invoiceNumber", label: "Invoice #", minWidth: 100},
    {id: "status", label: "Invoice status", minWidth: 150},
    {id: "auto", label: "Auto", minWidth: 100},
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

    function handleRequestError(error) {
        if (error.response && error.response.status !== 500) {
            alert("error");
        } else {
            alert("Cannot get response from server");
        }
    }

    async function fetchWaybills(cleanupFunction) {
        if (!cleanupFunction) setWaybills(await getAllWaybills());
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchWaybills(cleanupFunction)
            .catch((err) => {
                setWaybills([]);
                handleRequestError(err);
            });
        return () => cleanupFunction = true;
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    let foundWaybill = {};
    let checkPassage = true;
    let checkLosses = true;

    const handleTableRowClick = async (wb) => {
        foundWaybill = await getWaybillById(wb.id);
        foundWaybill.points.forEach(p => {
            if (!p.passed) {
                checkPassage = false;
            }
        });
        foundWaybill.invoice.products.forEach(p => {
            if (p.productStatus === "LOST") {
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
        <div>
            <Paper>
                <TableContainer>
                    <Typography variant="h5" gutterBottom style={{textAlign: "left", margin: 15}}>
                        Waybills
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
                    dialogTitle={"Waybill info"}
                    fullWidth={true}
                    maxWidth="md"
                    handleClose={handleClose}
                    openDialog={waybillInfoDialogOpen}
                    form={form}
                />

            </Paper>
        </div>
    );
})