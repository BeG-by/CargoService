import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import useToast from "../../../parts/toast-notification/useToast";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import {handleRequestError, makeRequest, STORAGE_URL} from "../../../parts/util/request-util";
import ConfirmDeletingDialog from "../../admin/slide-dialog";
import {StorageDialog} from "./storage-dialog";
import {Typography} from "@material-ui/core";
import LibraryAddRoundedIcon from "@material-ui/icons/LibraryAddRounded";
import {connect} from "react-redux";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import "../styles/storage-form.css";
import Tooltip from "@material-ui/core/Tooltip";
import EnhancedTableHead, {getComparator, stableSort} from "../../../parts/util/sorted-table-head";

const MIN_WIDTH = 170;
const ALIGN = "left";
const FONT_SIZE = 18;

const columns = [
    {id: "country", label: "Country", minWidth: MIN_WIDTH, align: ALIGN, fontSize: FONT_SIZE},
    {id: "city", label: "City", minWidth: MIN_WIDTH, align: ALIGN, fontSize: FONT_SIZE},
    {id: "street", label: "Street", minWidth: MIN_WIDTH, align: ALIGN, fontSize: FONT_SIZE},
    {id: "house", label: "House", minWidth: MIN_WIDTH, align: ALIGN, fontSize: FONT_SIZE},
    {id: "email", label: "Email", minWidth: MIN_WIDTH, align: ALIGN, fontSize: FONT_SIZE},
    {id: "phone", label: "Phone", minWidth: 140, align: ALIGN, fontSize: FONT_SIZE},
    {id: "edit_delete", align: "right"}
];

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const StorageTable = connect(mapStateToProps)((props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalStoragesAmount, setTotalStoragesAmount] = useState(0);

    const [storages, setStorages] = useState([]);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedStorageId, setSelectedStorageId] = useState(-1);
    const [toastComponent, showToastComponent] = useToast();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('status');

    const REMOVE_TITLE = "Do you want to remove the storage ?";

    useEffect(() => {
        insertStorages()
    }, []);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const insertStorages = async (curPage = page, curRowsPerPage = rowsPerPage) => {
        try {
            let url = `${STORAGE_URL}?page=${curPage}&storagesPerPage=${curRowsPerPage}`
            let result = await makeRequest("GET", url)
            setStorages(result.data.storages);
            setTotalStoragesAmount(result.data.totalAmount)
        } catch (err) {
            handleRequestError(err, showToastComponent)
        }
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
        insertStorages(newPage);
    };

    const handleTableRowClick = (auto) => {
        setSelectedStorageId(auto.id);
        setFormDialogOpen(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        insertStorages(page, +event.target.value);
    };


    return (
        <main>
            <Paper className="table-paper">
                <TableContainer className="table-container">
                    <div className="table-header-wrapper">
                        <Typography variant="button" display="block" gutterBottom
                                    style={{fontSize: 26, marginLeft: 15, marginTop: 15, textDecoration: "underline"}}
                                    className="table-title"
                        >
                            <LibraryBooksIcon/>
                            Storages
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setFormDialogOpen(true)}
                            className="add-table-btn"
                        >
                            <LibraryAddRoundedIcon/>
                        </Button>
                    </div>

                    <Table aria-label="sticky table">
                        <EnhancedTableHead
                            columns={columns}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(storages, getComparator(order, orderBy))
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
                                            <TableCell key={columns[0].id} align={columns[0].align}>
                                                {storage.address.country}
                                            </TableCell>
                                            <TableCell key={columns[1].id} align={columns[1].align}>
                                                {storage.address.city}
                                            </TableCell>
                                            <TableCell key={columns[2].id} align={columns[2].align}>
                                                {storage.address.street}
                                            </TableCell>
                                            <TableCell key={columns[3].id} align={columns[3].align}>
                                                {storage.address.house}
                                            </TableCell>
                                            <TableCell key={columns[4].id} align={columns[4].align}>
                                                {storage.email}
                                            </TableCell>
                                            <TableCell key={columns[5].id} align={columns[5].align}>
                                                {storage.phone}
                                            </TableCell>
                                            <TableCell key={columns[6].id} align={columns[6].align}>
                                                <div className="table-delete-edit-div">
                                                    <Tooltip title="Click to edit storage"
                                                             arrow>
                                                        <Button
                                                            className="menu-table-btn"
                                                            color={"primary"}
                                                            startIcon={<EditIcon/>}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleTableRowClick(storage)
                                                            }}/>
                                                    </Tooltip>
                                                    <ConfirmDeletingDialog
                                                        id={storage.id}
                                                        onDelete={deleteStorage}
                                                        text={REMOVE_TITLE}
                                                        toolTitle="Click to delete storage"
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
                    count={totalStoragesAmount}
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
        </main>
    );
})