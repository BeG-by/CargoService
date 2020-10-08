import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import useToast from "../../../parts/toast-notification/useToast";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import {AUTO_URL, handleRequestError, makeRequest} from "../../../parts/util/request-util";
import {AutoDialog} from "./auto-dialog";
import ConfirmDeletingDialog from "../slide-dialog";
import {Typography} from "@material-ui/core";
import LibraryAddRoundedIcon from "@material-ui/icons/LibraryAddRounded";
import {connect} from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

const MIN_WIDTH = 170;
const ALIGN = "left";

const columns = [
    {id: "mark", label: "Mark", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "number", label: "Number", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "type", label: "Type", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "consumption", label: "Consumption", minWidth: 100, align: ALIGN},
    {id: "maxLoad", label: "Max load", minWidth: 100, align: ALIGN},
    {id: "dateOfIssue", label: "Date of issue", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "status", label: "Status", minWidth: 100, align: ALIGN},
    {id: "edit_delete", label: "", align: "center"}
];

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const AutoTable = connect(mapStateToProps)((props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [autos, setAutos] = useState([]);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedAutoId, setSelectedAutoId] = useState(-1);
    const [toastComponent, showToastComponent] = useToast();
    const role = props.role;
    const REMOVE_TITLE = "Do you want to remove the auto ?";

    useEffect(() => {
        insertAutos()
    }, []);

    const insertAutos = () => {
        makeRequest("GET", AUTO_URL)
            .then(res => {
                    setAutos(res.data);
                }
            )
            .catch(error => handleRequestError(error, showToastComponent))
    };


    const deleteAuto = (id) => {
        makeRequest("DELETE", AUTO_URL + "/" + id)
            .then(res => {
                insertAutos();
                showToastComponent("Auto has been deleted", "success");
            })
            .catch(error => handleRequestError(error, showToastComponent))
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleTableRowClick = (auto) => {
        setSelectedAutoId(auto.id);
        setFormDialogOpen(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <main>
            <Paper className="table-paper">
                <TableContainer className="table-container">
                    <div className="table-header-wrapper">
                        <Typography variant="button" display="block" gutterBottom
                                    style={{fontSize: 26, marginLeft: 15, marginTop: 15, textDecoration: "underline" }}
                                    className="table-title"
                        >
                            <LibraryBooksIcon/>
                            Autos
                        </Typography>
                        <Button variant="contained"
                                color={"primary"}
                                onClick={() => setFormDialogOpen(true)}
                                className="add-table-btn"
                        >
                            <LibraryAddRoundedIcon/>
                        </Button>
                    </div>
                    <Table aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => {

                                    if (column.id === "consumption" || column.id === "maxLoad") {

                                        const notice = column.id === "consumption" ? "Liter / 100 km" : "KG";

                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth, fontSize: 18, color: "#3f51b5"}}
                                            >
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <Tooltip title={notice} arrow>
                                                        <div>{column.label}</div>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        )
                                    }

                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth, fontSize: 18, color: "#3f51b5"}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {autos
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((auto) => {

                                    return (
                                        <TableRow
                                            onClick={() => {
                                                handleTableRowClick(auto);
                                            }}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={auto.id}
                                        >
                                            <TableCell key={columns[0].id} align={columns[0].align}>
                                                {auto.mark}
                                            </TableCell>
                                            <TableCell key={columns[1].id} align={columns[1].align}>
                                                {auto.number}
                                            </TableCell>
                                            <TableCell key={columns[2].id} align={columns[2].align}>
                                                {auto.autoType}
                                            </TableCell>
                                            <TableCell key={columns[3].id} align={columns[3].align}>
                                                {auto.consumption}
                                            </TableCell>
                                            <TableCell key={columns[4].id} align={columns[4].align}>
                                                {auto.maxLoad}
                                            </TableCell>
                                            <TableCell key={columns[5].id} align={columns[5].align}>
                                                {auto.dateOfIssue}
                                            </TableCell>
                                            <TableCell key={columns[6].id} align={columns[6].align}>
                                                {auto.status}
                                            </TableCell>
                                            <TableCell key={columns[7].id} align={columns[7].align}>
                                                <div className="table-delete-edit-div">
                                                    <Tooltip title="Click to edit auto"
                                                             arrow>
                                                        <Button
                                                            className="menu-table-btn"
                                                            color={"primary"}
                                                            startIcon={<EditIcon/>}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleTableRowClick(auto)
                                                            }}/>
                                                    </Tooltip>
                                                    <ConfirmDeletingDialog
                                                        id={auto.id}
                                                        onDelete={deleteAuto}
                                                        text={REMOVE_TITLE}
                                                        toolTitle="Click to delete auto"
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 15, 20]}
                    component="div"
                    count={autos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <AutoDialog
                    open={formDialogOpen}
                    autoId={selectedAutoId}
                    onClose={() => {
                        setFormDialogOpen(false);
                        setSelectedAutoId(-1);
                    }}
                    refreshTable={insertAutos}
                    showToast={showToastComponent}
                />
                {toastComponent}
            </Paper>
        </main>
    );
});
