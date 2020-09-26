import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import UserDialog from "./user-dialog";
import {getAllUsers} from "./request-util";
import {BodyWrapper} from "../../pages/body-wrapper";
import useToast from "../../parts/toast-notification/useToast";
import Button from "@material-ui/core/Button";


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
        minWidth: 170,
        align: "center",
    },
    {
        id: "email",
        label: "Email",
        minWidth: 170,
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
        getAllUsers()
            .then(res => setUsers(res.data))
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
        <Paper className={classes.root}>
            <Button variant="contained" color="primary" onClick={() => setFormDialogOpen(true)}>
                Create user
            </Button>
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
    );
}


export default () => <BodyWrapper content={UserTable}/>
