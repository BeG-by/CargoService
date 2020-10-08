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
import fetchFieldFromObject from "../../../parts/util/function-util";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {connect} from "react-redux";
import TextSearch from "../../../parts/search/text-search";
import ConfirmDeletingDialog from "../../admin/slide-dialog";
import Tooltip from "@material-ui/core/Tooltip";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

const MAX_WIDTH = 170;
const MIN_WIDTH = 170;
const ALIGN = "left";
const REMOVE_TITLE = "Do you want to delete the storage ?";

const columns = [
    {id: "name", label: "Name", maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, align: ALIGN},
    {id: "type", label: "Company type", maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, align: ALIGN},
    {id: "phone", label: "Phone", maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, align: ALIGN},
    {id: "address.country", label: "Country", maxWidth: 150, minWidth: 150, align: ALIGN},
    {id: "address.city", label: "City", maxWidth: 150, minWidth: 150, align: ALIGN},
    {id: "address.street", label: "Street", maxWidth: 150, minWidth: 150, align: ALIGN},
    {id: "address.house", label: "House", maxWidth: 100, minWidth: 100, align: ALIGN},
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
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [amountProductOwners, setAmountProductOwners] = useState(0);

    const [productOwnerDialogOpen, setProductOwnerDialogOpen] = useState(false);
    const [selectedProductOwnerId, setSelectedProductOwnerId] = useState(-1);
    const [productOwners, setProductOwners] = useState([]);
    const [selectedProductOwner, setSelectedProductOwner] = useState(EMPTY_PRODUCT_OWNER);
    const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
    const [toastComponent, showToastComponent] = useToast();
    const role = props.role;

    const updateTable = (isComponentMounted = true, newPage = page, newRowsPerPage = rowsPerPage) => {
        makeRequest("GET", OWNER_URL + `?requestedPage=${newPage}&productOwnersPerPage=${newRowsPerPage}`)
            .then((response) => {
                if (isComponentMounted) {
                    setAmountProductOwners(response.data.totalAmountProductOwners);
                    setProductOwners(response.data.productOwners);
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
        updateTable(true, newPage);
    };

    const handleEditProductOwnerClick = (productOwner) => {
        setProductOwnerDialogOpen(true);
        setSelectedProductOwnerId(productOwner.id)
    };

    async function deleteProductOwner(id) {
        try {
            await makeRequest("DELETE", OWNER_URL + "/" + id);
            updateTable();
            showToastComponent("Client has been deleted", "success");
        } catch (error) {
            handleRequestError(error, toastComponent);
        }
    }


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
        updateTable(true, page, +event.target.value)
    };

    const updateTableWithSearch = (searchStr) => {
        searchStr = searchStr.trim();
        if (searchStr === "") {
            updateTable();
        } else {
            const uri = `${OWNER_URL}/filter?name=${searchStr}&requestedPage=${page}&productOwnersPerPage=${rowsPerPage}`;
            makeRequest("GET", uri)
                .then((response) => {
                    setAmountProductOwners(response.data.totalAmountProductOwners);
                    setProductOwners(response.data.productOwners);
                })
                .catch((err) => {
                    setProductOwners([]);
                    handleRequestError(err, showToastComponent);
                })
        }
    };

    return (
        <main>
            <Paper style={{marginLeft: 20}} className="table-paper">
                <TableContainer className="table-container">
                    <div className="table-header-wrapper">
                        <Typography variant="button" display="block" gutterBottom
                                    style={{fontSize: 26, marginLeft: 15, marginTop: 15, textDecoration: "underline"}}
                                    className="table-title"
                        >
                            <LibraryBooksIcon/>
                            Clients
                        </Typography>
                        <div className="table-header-right-part">
                            <TextSearch onFieldChange={updateTableWithSearch}/>
                            <Button variant="contained"
                                    color={"primary"}
                                    onClick={handleCreateProductOwnerClick}
                                    className="add-table-btn"
                            >
                                <LibraryAddRoundedIcon/>
                            </Button>
                        </div>
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
                                                    <Tooltip title="Click to create new invoice"
                                                             arrow>
                                                        <Button
                                                            color={"primary"}
                                                            className="menu-table-btn"
                                                            startIcon={<NoteAddIcon/>}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleTableRowClick(client)
                                                            }}/>
                                                    </Tooltip>
                                                    <Tooltip title="Click to edit client"
                                                             arrow>
                                                        <Button
                                                            color={"primary"}
                                                            className="menu-table-btn"
                                                            startIcon={<EditIcon/>}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEditProductOwnerClick(client)
                                                            }}/>
                                                    </Tooltip>
                                                    <ConfirmDeletingDialog
                                                        id={client.id}
                                                        onDelete={deleteProductOwner}
                                                        text={REMOVE_TITLE}
                                                        toolTitle="Click to delete client"
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
                    rowsPerPageOptions={[7, 15, 30]}
                    component="div"
                    count={amountProductOwners}
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
                openToast={showToastComponent}
            />
        </main>
    );
});