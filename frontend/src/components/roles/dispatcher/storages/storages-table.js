import React, {useEffect, useState} from "react";
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
import {handleRequestError, makeRequest, STORAGE_URL} from "../../../parts/util/request-util";
import ConfirmDeletingDialog from "../../admin/slide-dialog";
import {StorageDialog} from "./storage-dialog";


const columns = [
    {id: "country", label: "Country", minWidth: 170, align: "center"},
    {id: "city", label: "City", minWidth: 170, align: "center"},
    {id: "street", label: "Street", minWidth: 170, align: "center"},
    {id: "house", label: "House", minWidth: 100, align: "center"},
    {id: "email", label: "Email", minWidth: 170, align: "center"},
    {id: "phone", label: "Phone", minWidth: 100, align: "center"},
    {id: "edit_delete", label: "", minWidth: 60, align: "center"}
];


export function StorageTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [storages, setStorages] = useState([]);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedStorageId, setSelectedStorageId] = useState(-1);
    const [toastComponent, showToastComponent] = useToast();

    const REMOVE_TITLE = "Do you want to remove the storage ?";

    useEffect(() => {
        insertStorages()
    }, []);

    const insertStorages = () => {
        makeRequest("GET", STORAGE_URL)
            .then(res => setStorages(res.data))
            .catch(error => handleRequestError(error , showToastComponent))
    };


    const deleteStorage = (id) => {
        makeRequest("DELETE", STORAGE_URL + "/" + id)
            .then(res => {
                insertStorages();
                showToastComponent("Storage has been deleted", "success");
            })
            .catch(error => handleRequestError(error, showToastComponent))
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleTableRowClick = (auto) => {
        setSelectedStorageId(auto.id);
        setFormDialogOpen(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div className="storage-table-wrapper">
            <Button
                variant="contained"
                color="primary"
                onClick={() => setFormDialogOpen(true)}>
                Create storage
            </Button>
            <Paper >
                <TableContainer>
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
                            {storages
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((storage) => {

                                    return (
                                        <TableRow
                                            onClick={() => {
                                                handleTableRowClick(storage);
                                            }}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={storage.id}
                                        >
                                            <TableCell key={columns[0].id} align="center">
                                                {storage.address.country}
                                            </TableCell>
                                            <TableCell key={columns[1].id} align="center">
                                                {storage.address.city}
                                            </TableCell>
                                            <TableCell key={columns[2].id} align="center">
                                                {storage.address.street}
                                            </TableCell>
                                            <TableCell key={columns[3].id} align="center">
                                                {storage.address.house}
                                            </TableCell>
                                            <TableCell key={columns[4].id} align="center">
                                                {storage.email}
                                            </TableCell>
                                            <TableCell key={columns[5].id} align="center">
                                                {storage.phone}
                                            </TableCell>
                                            <TableCell key={columns[6].id} align="center">
                                                <div className="table-delete-edit-div">
                                                    <Button
                                                        className="basket-table-btn"
                                                        color={"primary"}
                                                        startIcon={<EditIcon/>}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTableRowClick(storage)
                                                        }}/>
                                                    <ConfirmDeletingDialog
                                                        id={storage.id}
                                                        onDelete={deleteStorage}
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
                    count={storages.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <StorageDialog
                    open={formDialogOpen}
                    storageId={selectedStorageId}
                    onClose={() => {
                        setFormDialogOpen(false);
                        setSelectedStorageId(-1);
                    }}
                    refreshTable={insertStorages}
                    showToast={showToastComponent}
                    handleError={handleRequestError}
                />
                {toastComponent}
            </Paper>
        </div>
    );
}


export default () => <BodyWrapper content={StorageTable}/>
