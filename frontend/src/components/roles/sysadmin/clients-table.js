import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ClientDialog from "./client-dialog";
import Button from "@material-ui/core/Button";
import useToast from "../../parts/toast-notification/useToast";
import fetchFieldFromObject from "../../parts/util/function-util";
import {CLIENTS_URL, handleRequestError, makeRequest} from "../../parts/util/request-util";
import {Typography} from "@material-ui/core";
import LibraryAddRoundedIcon from "@material-ui/icons/LibraryAddRounded";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmDeletingDialog from "../admin/slide-dialog";
import {connect} from "react-redux";
import EnhancedTableHead, {getComparator, stableSort} from "../../parts/util/sorted-table-head";

const MIN_WIDTH = 170;
const ALIGN = "left";

const columns = [
    {id: "name", label: "Name", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "type", label: "Company type", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "payerAccountNumber", label: "Payer account number", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "address.country", label: "Country", minWidth: 150, align: ALIGN},
    {id: "address.city", label: "City", minWidth: 150, align: ALIGN},
    {id: "address.street", label: "Street", minWidth: 150, align: ALIGN},
    {id: "address.house", label: "House", minWidth: 150, align: ALIGN},
    {id: "registrationDate", label: "Date of registration", minWidth: MIN_WIDTH, align: ALIGN},
    {id: "edit_delete", label: "", align: "right"}
];

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

const REMOVE_TITLE = "Do you want to remove the client ?";


export const ClientsTable = connect(mapStateToProps)((props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [clients, setClients] = useState([]);
    const [clientDialogOpen, setClientDialogOpen] = useState(false);
    const [selectedClientCompanyId, setSelectedClientCompanyId] = useState(-1);
    const [toastComponent, showToastComponent] = useToast();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    async function updateTable() {
        try {
            const response = await makeRequest("GET", CLIENTS_URL);
            setClients(response.data);
        } catch (error) {
            handleRequestError(error, showToastComponent);
        }
    }

    useEffect(() => {
        updateTable();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleTableRowClick = (client) => {
        setSelectedClientCompanyId(client.id);
        setClientDialogOpen(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCreateNewClientCLick = () => {
        setClientDialogOpen(true);
    };

    return (
        <main>
            <Paper className="table-paper">
                <TableContainer className="table-container">
                    <div className="table-header-wrapper">
                        <Typography variant="h5" gutterBottom>
                            Clients
                        </Typography>
                        <Button variant="contained"
                                color={"primary"}
                                onClick={handleCreateNewClientCLick}
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
                            checkBoxes={false}
                        />
                        <TableBody>
                            {stableSort(clients, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((client) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={client.id}
                                        >
                                            {columns.map((column) => {
                                                let value = fetchFieldFromObject(client, column.id);
                                                if (value === "SP") {
                                                    value = "Sole proprietorship";
                                                } else if (value === "JP") {
                                                    value = "Juridical person";
                                                }
                                                if (column.id !== "edit_delete")
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell
                                                key={"edit_delete"}
                                                align={"right"}
                                            >
                                                <div className="table-delete-edit-div">
                                                    <Button
                                                        className="menu-table-btn"
                                                        color={"primary"}
                                                        startIcon={<EditIcon/>}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTableRowClick(client)
                                                        }}/>
                                                    <ConfirmDeletingDialog //TODO remove client
                                                        id={client.id}
                                                        onDelete={() => alert("Delete")}
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
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={clients.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <ClientDialog
                    open={clientDialogOpen}
                    clientCompanyId={selectedClientCompanyId}
                    onDelete={() => {
                        setClientDialogOpen(false);
                        setSelectedClientCompanyId(-1);
                        updateTable();
                    }}
                    onClose={() => {
                        setClientDialogOpen(false);
                        setSelectedClientCompanyId(-1);
                        updateTable();
                    }}
                    onSubmit={() => {
                        setClientDialogOpen(false);
                        setSelectedClientCompanyId(-1);
                        updateTable();
                    }}
                />
            </Paper>
            {toastComponent}
        </main>
    );
})
