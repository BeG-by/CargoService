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
import {UserDialog} from "./user-dialog";
import {deleteUser, findAllUsers} from "./request-util";
import {BodyWrapper} from "../../pages/body-wrapper";
import useToast from "../../parts/toast-notification/useToast";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import ConfirmDeletingDialog from "./slide-dialog";


const columns = [
    {id: "name", label: "Name", minWidth: 170},
    {id: "surname", label: "Surname", minWidth: 170},
    {id: "patronymic", label: "Patronymic", minWidth: 170},
    {
        id: "role",
        label: "Role",
        minWidth: 170,
        align: "center",
    },
    {
        id: "birthday",
        label: "Date of birth",
        minWidth: 170,
        align: "center",
        format: (value) => value.toFixed(2),
    },
    {
        id: "status",
        label: "Status",
        minWidth: 100,
        align: "center",
    },
    {
        id: "email",
        label: "Email",
        minWidth: 170,
        align: "center",
    },
    {
        id: "phone",
        label: "Phone",
        minWidth: 100,
        align: "center",
    },
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

export function UserTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [users, setUsers] = useState([]);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(-1);
    const [toastComponent, showToastComponent] = useToast();

    useEffect(() => {
        insertUsers()
    }, []);

    const insertUsers = () => {
        findAllUsers()
            .then(res => setUsers(res.data))
            .catch(error => handleRequestError(error))
    };


    const deleteSelectedUser = (id) => {
        deleteUser(id)
            .then(res => {
                insertUsers();
                showToastComponent("User has been deleted", "success");
            })
            .catch(error => handleRequestError(error))
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

    const handleRequestError = (error) => {
        if (error.response && error.response.status !== 500) {
            showToastComponent("Operation was failed. " + error.response.data, "error");
        } else {
            showToastComponent("Operation was failed. Cannot get response from server", "error");
        }
    };

    return (
        <div className="user-table-wrapper">
            <Button
                className="add-user-btn"
                variant="contained"
                    color="primary"
                    onClick={() => setFormDialogOpen(true)}>
                Create user
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
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user) => {

                                    let status = user.status.charAt(0) + user.status.substring(1).toLowerCase();
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
                                            <TableCell key={columns[0].id}>
                                                {user.name}
                                            </TableCell>
                                            <TableCell key={columns[1].id}>
                                                {user.surname}
                                            </TableCell>
                                            <TableCell key={columns[2].id}>
                                                {user.patronymic}
                                            </TableCell>
                                            <TableCell key={columns[3].id} align={columns[3].align}>
                                                {roles}
                                            </TableCell>
                                            <TableCell key={columns[4].id} align={columns[3].align}>
                                                {user.birthday}
                                            </TableCell>
                                            <TableCell key={columns[5].id} align={columns[4].align}>
                                                {status}
                                            </TableCell>
                                            <TableCell key={columns[6].id} align={columns[5].align}>
                                                {user.email}
                                            </TableCell>
                                            <TableCell key={columns[6].id} align={columns[5].align}>
                                                {user.phone}
                                            </TableCell>
                                            <TableCell key={columns[7].id}>
                                                <div className="table-delete-edit-div">
                                                    <Button
                                                        className="user-table-btn"
                                                        color={"primary"}
                                                        startIcon={<EditIcon/>}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTableRowClick(user)
                                                        }}/>
                                                    <ConfirmDeletingDialog
                                                        userId={user.id}
                                                        deleteUser={deleteSelectedUser}
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
                    handleError={handleRequestError}
                />
                {toastComponent}
            </Paper>
        </div>
    );
}


export default () => <BodyWrapper content={UserTable}/>
