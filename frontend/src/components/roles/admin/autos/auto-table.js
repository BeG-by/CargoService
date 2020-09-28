import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {BodyWrapper} from "../../../pages/body-wrapper";
import useToast from "../../../parts/toast-notification/useToast";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import {makeRequest, AUTO_URL} from "../request-util";
import {AutoDialog} from "./auto-dialog";
import ConfirmDeletingDialog from "../slide-dialog";


const columns = [
    {id: "mark", label: "Mark", minWidth: 170},
    {id: "type", label: "Type", minWidth: 170},
    {
        id: "edit_delete",
        label: "",
        minWidth: 60,
        align: "center",
    }
];


const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

export function AutoTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [autos, setAutos] = useState([]);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedAutoId, setSelectedAutoId] = useState(-1);
    const [toastComponent, showToastComponent] = useToast();

    const REMOVE_TITLE = "Do you want to remove the auto ?";

    useEffect(() => {
        insertAutos()
    }, []);

    const insertAutos = () => {
        makeRequest("GET", AUTO_URL)
            .then(res => setAutos(res.data))
            .catch(error => handleRequestError(error))
    };


    const deleteAuto = (id) => {
        makeRequest("DELETE", AUTO_URL + "/" + id)
            .then(res => {
                insertAutos();
                showToastComponent("Auto has been deleted", "success");
            })
            .catch(error => handleRequestError(error))
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

    const handleRequestError = (error) => {
        if (error.response && error.response.status !== 500) {
            showToastComponent("Operation was failed. " + error.response.data, "error");
        } else {
            showToastComponent("Operation was failed. Cannot get response from server", "error");
        }
    };

    return (
        <div className="auto-table-wrapper">
            <Button
                className="add-auto-btn"
                variant="contained"
                color="primary"
                onClick={() => setFormDialogOpen(true)}>
                Create auto
            </Button>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
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
                                            <TableCell key={columns[0].id}>
                                                {auto.mark}
                                            </TableCell>
                                            <TableCell key={columns[1].id}>
                                                {auto.autoType}
                                            </TableCell>
                                            <TableCell key={columns[2].id}>
                                                <div className="table-delete-edit-div">
                                                    <Button
                                                        className="auto-table-btn"
                                                        color={"primary"}
                                                        startIcon={<EditIcon/>}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTableRowClick(auto)
                                                        }}/>
                                                    <ConfirmDeletingDialog
                                                        id={auto.id}
                                                        onDelete={deleteAuto}
                                                        text={REMOVE_TITLE}
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
                    handleError={handleRequestError}
                />
                {toastComponent}
            </Paper>
        </div>
    );
}


export default () => <BodyWrapper content={AutoTable}/>