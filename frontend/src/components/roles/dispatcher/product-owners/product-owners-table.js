import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {handleRequestError, makeRequest, OWNER_URL} from "../../../parts/util/request-util";
import InvoiceDialog from "../invoice/invoice-dialog";
import useToast from "../../../parts/toast-notification/useToast";
import Button from "@material-ui/core/Button";
import ProductOwnerDialog from "./product-owner-dialog";
import EditIcon from '@material-ui/icons/Edit';
import LibraryAddRoundedIcon from "@material-ui/icons/LibraryAddRounded";
import {Typography} from "@material-ui/core";
import fetchFieldFromObject from "../../../parts/util/fetch-field-from-object";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {NotAuthorized} from "../../../pages/error-page/error-401";
import {connect} from "react-redux";

const MAX_WIDTH = 170;
const MIN_WIDTH = 170;
const ALIGN = "left";

const columns = [
    {id: "name", label: "Name", maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, align: ALIGN},
    {id: "type", label: "Company type", maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, align: ALIGN},
    {id: "phone", label: "Phone", maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, align: ALIGN},
    {id: "address.country", label: "Country", maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, align: ALIGN},
    {id: "address.city", label: "City", maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, align: ALIGN},
    {id: "address.street", label: "Street", maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, align: ALIGN},
    {id: "address.house", label: "House", maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, align: ALIGN},
    {id: "registrationDate", label: "Date of registration", maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, align: ALIGN},
];

const EMPTY_PRODUCT_OWNER = {
    name: "",
    type: "SP",
    phone: "",
};

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const ProductOwnersTable = connect(mapStateToProps)((props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [productOwnerDialogOpen, setProductOwnerDialogOpen] = useState(false);
    const [selectedProductOwnerId, setSelectedProductOwnerId] = useState(-1);
    const [productOwners, setProductOwners] = useState([]);
    const [selectedProductOwner, setSelectedProductOwner] = useState(EMPTY_PRODUCT_OWNER);
    const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
    const [toastComponent, showToastComponent] = useToast();
    const role = props.role;

    const updateTable = (isComponentMounted = true) => {
        makeRequest("GET", OWNER_URL)
            .then((response) => {
                if (isComponentMounted) { //todo: is it a valid way to avoid memory leak? (we make axios request but dont change state)
                    setProductOwners(response.data)
                }
            })
            .catch((err) => {
                setProductOwners([]);
                handleRequestError(err, showToastComponent);
            })
    };

    useEffect(() => {
        let mounted = true;
        updateTable(mounted);
        return () => mounted = false;
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleEditProductOwnerClick = (productOwner) => {
        setProductOwnerDialogOpen(true);
        setSelectedProductOwnerId(productOwner.id)
    };

    const handleTableRowClick = (productOwner) => {
        setSelectedProductOwner(productOwner);
        setInvoiceDialogOpen(true);
    };

    const handleCreateProductOwnerClick = () => {
        setSelectedProductOwnerId(-1);
        setProductOwnerDialogOpen(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        role === "UNKNOWN" ? <NotAuthorized/> :
        <main>
            <Paper className="table-paper">
                <TableContainer className="table-container">
                    <div className="table-header-wrapper">
                        <Typography variant="h5" gutterBottom>
                            Clients
                        </Typography>
                        <Button variant="contained"
                                color={"primary"}
                                onClick={handleCreateProductOwnerClick}
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
                                <TableCell
                                    key={"edit_product_owner"}
                                    align={"right"}
                                >
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productOwners
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((client) => {
                                    return (
                                        <TableRow
                                            onClick={() => {
                                                handleTableRowClick(client);
                                            }}
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
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell key={"edit_product_owner"}>
                                                <div className="table-delete-edit-div">
                                                    <Button
                                                        color={"primary"}
                                                        className="menu-table-btn"
                                                        startIcon={<NoteAddIcon/>}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTableRowClick(client)
                                                        }}/>
                                                    <Button
                                                        color={"primary"}
                                                        className="menu-table-btn"
                                                        startIcon={<EditIcon/>}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditProductOwnerClick(client)
                                                        }}/>
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
                    count={productOwners.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            {toastComponent}

            <InvoiceDialog
                productOwner={selectedProductOwner}
                open={invoiceDialogOpen}
                onClose={() => {
                    setInvoiceDialogOpen(false);
                }}
            />

            <ProductOwnerDialog
                open={productOwnerDialogOpen}
                productOwnerId={selectedProductOwnerId}
                onClose={() => {
                    setProductOwnerDialogOpen(false);
                    setSelectedProductOwnerId(-1);
                    updateTable();
                }}
            />
        </main>
    );
})