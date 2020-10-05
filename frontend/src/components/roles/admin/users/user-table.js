import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {UserDialog} from "./user-dialog";
import useToast from "../../../parts/toast-notification/useToast";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import ConfirmDeletingDialog from "../slide-dialog";
import {handleRequestError, makeRequest, USER_URL} from "../../../parts/util/request-util"
import {Typography} from "@material-ui/core";
import LibraryAddRoundedIcon from "@material-ui/icons/LibraryAddRounded";
import {NotAuthorized} from "../../../pages/error-page/error-401";
import {connect} from "react-redux";


const MIN_WIDTH = 170;
const ALIGN = "left";

const columns = [
    {id: "name", label: "Name", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "surname", label: "Surname", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "patronymic", label: "Patronymic", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "role", label: "Role", minWidth: 150, align: "center"},
    {id: "birthday", label: "Date of birth", minWidth: MIN_WIDTH, align: ALIGN, format: (value) => value.toFixed(2)},
    {id: "status", label: "Status", minWidth: 150, align:ALIGN},
    {id: "email", label: "Email", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "edit_delete", label: "", align: "right"}

];

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const UserTable = connect(mapStateToProps)((props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [users, setUsers] = useState([]);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(-1);
    const [toastComponent, showToastComponent] = useToast();
    const role = props.role;
    const REMOVE_TITLE = "Do you want to remove the user ?";

    useEffect(() => {
        insertUsers()
    }, []);

    const insertUsers = () => {
        makeRequest("GET", USER_URL)
            .then(res => setUsers(res.data))
            .catch(error => handleRequestError(error, showToastComponent))
    };


    const deleteSelectedUser = (id) => {
        makeRequest("DELETE", USER_URL + "/" + id)
            .then(res => {
                insertUsers();
                showToastComponent("User has been deleted", "success");
            })
            .catch(error => handleRequestError(error, showToastComponent))
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleTableRowClick = (user) => {
        setSelectedUserId(user.id);
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
                        <Typography variant="h5" gutterBottom>
                            Users
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
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth, fontSize: 18, color: "#3f51b5"}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user) => {

                                    let roles = user.roles.map(role => role.charAt(0) + role.substring(1).toLowerCase());

                                    return (
                                        <TableRow
                                            onClick={() => {
                                                handleTableRowClick(user);
                                            }}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={user.id}
                                        >
                                            <TableCell key={columns[0].id} align={columns[0].align}>
                                                {user.name}
                                            </TableCell>
                                            <TableCell key={columns[1].id} align={columns[1].align}>
                                                {user.surname}
                                            </TableCell>
                                            <TableCell key={columns[2].id} align={columns[2].align}>
                                                {user.patronymic}
                                            </TableCell>
                                            <TableCell key={columns[3].id} align={columns[3].align}>
                                                {roles}
                                            </TableCell>
                                            <TableCell key={columns[4].id} align={columns[4].align}>
                                                {user.birthday}
                                            </TableCell>
                                            <TableCell key={columns[5].id} align={columns[5].align}>
                                                {user.status}
                                            </TableCell>
                                            <TableCell key={columns[6].id} align={columns[6].align}>
                                                {user.email}
                                            </TableCell>
                                            <TableCell key={columns[7].id} align={columns[7].align}>
                                                <div className="table-delete-edit-div">
                                                    <Button
                                                        className="menu-table-btn"
                                                        color={"primary"}
                                                        startIcon={<EditIcon/>}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTableRowClick(user)
                                                        }}/>
                                                    <ConfirmDeletingDialog
                                                        id={user.id}
                                                        onDelete={deleteSelectedUser}
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
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <UserDialog
                    open={formDialogOpen}
                    userId={selectedUserId}
                    onClose={() => {
                        setFormDialogOpen(false);
                        setSelectedUserId(-1);
                    }}
                    refreshTable={insertUsers}
                    showToast={showToastComponent}
                />
                {toastComponent}
            </Paper>
        </main>
    );
});
