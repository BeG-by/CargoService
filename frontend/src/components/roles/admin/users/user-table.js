import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
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
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import {connect} from "react-redux";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import photo from "../../../../resources/images/user_no_photo.png";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import EnhancedTableHead, {getComparator, stableSort} from "../../../parts/util/sorted-table-head";
import Checkbox from '@material-ui/core/Checkbox';
import {MailDialog} from "./mail-dialog";


const MIN_WIDTH = 170;
const ALIGN = "left";
const FONT_SIZE = 18;

const columns = [
    {id: "photo", label: "", minWidth: 50, align: "center", fontSize: FONT_SIZE},
    {id: "email", label: "Email", minWidth: MIN_WIDTH, align: ALIGN, fontSize: FONT_SIZE},
    {id: "name", label: "Name", minWidth: MIN_WIDTH, align: ALIGN, fontSize: FONT_SIZE},
    {id: "surname", label: "Surname", minWidth: MIN_WIDTH, align: ALIGN, fontSize: FONT_SIZE},
    {id: "role", label: "Role", minWidth: 150, align: ALIGN, fontSize: FONT_SIZE},
    {
        id: "birthday",
        label: "Date of birth",
        minWidth: 140,
        align: ALIGN,
        fontSize: FONT_SIZE,
        format: (value) => value.toFixed(2)
    },
    {id: "status", label: "Status", minWidth: 100, align: ALIGN, fontSize: FONT_SIZE},
    {id: "edit_delete", label: "", align: "right"}
];


const isOnlineDiv = (isOnline) => {
    return isOnline ?
        <div>
            <FiberManualRecordSharpIcon style={{fontSize: 12, color: "green", marginTop: 3}}/>
            <span style={{marginLeft: 3}}>Online</span>
        </div>
        :
        <div>
            <FiberManualRecordSharpIcon style={{fontSize: 12, color: "crimson", marginTop: 3}}/>
            <span style={{marginLeft: 3}}>Offline</span>
        </div>
};

const getColorStatus = (status) => {

    switch (status) {
        case "ACTIVE":
            return <div className="green-status">{status}</div>;
        case "BLOCKED":
            return <div className="red-status">{status}</div>;
        default:
            return <div>{status}</div>
    }

};


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
    const [selectedPhotoId, setSelectedPhotoId] = useState(-1);
    const [toastComponent, showToastComponent] = useToast();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('status');
    const [checkboxes, setCheckboxes] = useState(new Set([]));
    const [mailDialog, setMailDialog] = useState(false);

    const role = props.role;
    const REMOVE_TITLE = "Do you want to remove the user ?";
    const maxSizeOfImg = 12000000;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChange = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();

        if (file !== undefined) {
            if (file.type.match("image.*")) {

                if (file.size > maxSizeOfImg) {
                    showToastComponent("File is to large. Max size is :" + maxSizeOfImg / 1000000 + "MB", "error");
                    return;
                }

                if (file.name.length > 100) {
                    showToastComponent("File name is too long (maximum is 100 characters)", "error");
                    return;
                }

                reader.readAsDataURL(file);

            } else {
                showToastComponent("Incorrect file type", "error")
            }
        }

        reader.onload = () => {
            let photoInBase64 = reader.result;
            makeRequest("PUT", USER_URL + "/photo/" + selectedPhotoId, {photo: photoInBase64})
                .then(res => {

                        users.forEach(u => {
                                if (u.id === selectedPhotoId) {
                                    u.photo = u.photo + "?time=" + new Date().getTime();
                                    showToastComponent("User's photo has been updated");
                                }
                            }
                        );

                    }
                )
                .catch(error => handleRequestError(error, showToastComponent))
        };
    };

    useEffect(() => {
        insertUsers()
    }, []);

    const insertUsers = () => {
        makeRequest("GET", USER_URL)
            .then(res => {
                setUsers(res.data.map(u => {
                    if (u.photo !== null) {
                        u.photo = u.photo + "?time=" + new Date().getTime();
                    }
                    return u;
                }))
            })
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

    const handleCheckBoxClick = (e, email) => {
        if (e.target.checked) {
            setCheckboxes((prevState) => new Set([...prevState, email]));
        } else {
            checkboxes.delete(email);
            setCheckboxes(checkboxes);
        }

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
                            Users
                        </Typography>
                        <div>
                            <Button
                                variant="contained"
                                color={"primary"}
                                onClick={() => {
                                    if (checkboxes.size === 0) {
                                        showToastComponent("You should choose at least one user", "warning")
                                    } else {
                                        setMailDialog(true)
                                    }
                                }}
                                className="add-table-btn"
                            >
                                <EmailRoundedIcon/>
                            </Button>
                            <Button variant="contained"
                                    color={"primary"}
                                    onClick={() => setFormDialogOpen(true)}
                                    className="add-table-btn"
                            >
                                <LibraryAddRoundedIcon/>
                            </Button>
                        </div>
                    </div>
                    <Table aria-label="sticky table">
                        <EnhancedTableHead
                            columns={columns}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            checkBoxes={true}
                        />
                        <TableBody>
                            {stableSort(users, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user) => {

                                    let roles = user.roles.map(role => role.charAt(0) + role.substring(1).toLowerCase());
                                    let inPutId = "hidden-input-user" + user.id;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={user.id}
                                        >
                                            <TableCell key={user.email} align="center">
                                                <Checkbox
                                                    onChange={(e) => handleCheckBoxClick(e, user.email)}
                                                    size="small"
                                                    inputProps={{'aria-label': 'checkbox with small size'}}
                                                    color="primary"
                                                />
                                            </TableCell>
                                            <TableCell key={columns[0].id} align={columns[0].align}
                                                       className="avatar-td">
                                                <Tooltip title="Click to edit photo"
                                                         arrow>
                                                    <Avatar alt="avatar"
                                                            src={user.photo === null ? photo : user.photo}
                                                            onClick={(e) => {
                                                                setSelectedPhotoId(user.id);
                                                                document.getElementById(inPutId).click();
                                                            }}
                                                    />
                                                </Tooltip>
                                                <input
                                                    type="file"
                                                    onChange={handleChange}
                                                    multiple={false}
                                                    size="1000"
                                                    accept="image/*"
                                                    hidden={true}
                                                    id={inPutId}
                                                />
                                            </TableCell>
                                            <TableCell key={columns[1].id} align={columns[1].align}>
                                                <div style={{display: "flex", flexDirection: "column"}}>
                                                    <span style={{fontWeight: "bold"}}>{user.email}</span>
                                                    {isOnlineDiv(user.online)}
                                                </div>
                                            </TableCell>
                                            <TableCell key={columns[2].id} align={columns[2].align}>
                                                {user.name}
                                            </TableCell>
                                            <TableCell key={columns[3].id} align={columns[3].align}>
                                                {user.surname}
                                            </TableCell>
                                            <TableCell key={columns[4].id} align={columns[4].align}>
                                                {roles}
                                            </TableCell>
                                            <TableCell key={columns[5].id} align={columns[5].align}>
                                                {user.birthday}
                                            </TableCell>
                                            <TableCell key={columns[6].id} align={columns[6].align}>
                                                {getColorStatus(user.status)}
                                            </TableCell>
                                            <TableCell key={columns[7].id} align={columns[7].align}>
                                                <div className="table-delete-edit-div">
                                                    <Tooltip title="Click to edit user"
                                                             arrow>
                                                        <Button
                                                            className="menu-table-btn"
                                                            color={"primary"}
                                                            startIcon={<EditIcon/>}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleTableRowClick(user)
                                                            }}/>
                                                    </Tooltip>
                                                    <ConfirmDeletingDialog
                                                        id={user.id}
                                                        onDelete={deleteSelectedUser}
                                                        text={REMOVE_TITLE}
                                                        toolTitle="Click to delete user"
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
                <MailDialog
                    open={mailDialog}
                    emails={checkboxes}
                    onClose={() => {
                        setMailDialog(false);
                    }}
                    showToast={showToastComponent}
                />

                {toastComponent}
            </Paper>
        </main>
    );
});
