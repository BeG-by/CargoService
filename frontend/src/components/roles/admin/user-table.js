import React, {useEffect} from "react";
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
        id: "address",
        label: "Address",
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


const fullAddressString = (address) => {

    if (address === null) {
        return "";
    }

    let props = [];

    for (let prop in address) {
        if (address[prop] !== null) {
            props.push(address[prop])
        }
    }

    return props.join(", ")

};

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

function UserTableContent() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [users, setUsers] = React.useState([]);
    const [formDialogOpen, setFormDialogOpen] = React.useState(false);
    const [selectedUserId, setSelectedUserId] = React.useState(
        -1
    );


    useEffect(() => {
        getAllUsers()
            .then(res => setUsers(res.data))
            .catch(error => alert(error))
    }, []);

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
                                            {user.roles}
                                        </TableCell>
                                        <TableCell key={columns[4].id} align={columns[3].align}>
                                            {user.birthday}
                                        </TableCell>
                                        <TableCell key={columns[5].id} align={columns[4].align}>
                                            {fullAddressString(user.address)}
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
                rowsPerPageOptions={[10, 25, 100]}
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
            />
        </Paper>
    );
}


export default function UserTable() {
    return <BodyWrapper content={UserTableContent}/>
}
