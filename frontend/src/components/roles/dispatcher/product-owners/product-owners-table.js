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
import {makeGetAllProductOwnersRequest} from "../request-utils";
import InvoiceDialog from "../invoice/invoice-dialog";
import {BodyWrapper} from "../../../pages/body-wrapper";
import useToast from "../../../parts/toast-notification/useToast";
import Button from "@material-ui/core/Button";
import ProductOwnerDialog from "./product-owner-dialog";
import EditIcon from '@material-ui/icons/Edit';

const columns = [
    {id: "name", label: "Name", minWidth: 170},
    {id: "type", label: "Company type", minWidth: 170},
    {id: "phone", label: "Phone", minWidth: 170, align: "center"},
    {id: "address.country", label: "Country", minWidth: 170, align: "center"},
    {id: "address.city", label: "City", minWidth: 170, align: "center"},
    {id: "address.street", label: "Street", minWidth: 170, align: "center"},
    {id: "address.house", label: "House", minWidth: 170, align: "center"},
    {
        id: "registrationDate",
        label: "RegistrationDate",
        minWidth: 170,
        align: "center",
    },
];

function fetchFieldFromObject(obj, prop) {
    if (obj === undefined || obj === null) {
        return;
    }
    let index = prop.indexOf(".");
    if (index > -1) {
        return fetchFieldFromObject(
            obj[prop.substring(0, index)],
            prop.substr(index + 1)
        );
    }

    return obj[prop];
}

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

const EMPTY_PRODUCT_OWNER = {
    name: "",
    type: "SP",
    phone: "",
};

export function ProductOwnersTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [productOwnerDialogOpen, setProductOwnerDialogOpen] = useState(false);
    const [selectedProductOwnerId, setSelectedProductOwnerId] = useState(-1);

    const [productOwners, setProductOwners] = useState([]);
    const [selectedProductOwner, setSelectedProductOwner] = useState(EMPTY_PRODUCT_OWNER);
    const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
    const [toastComponent, showToastComponent] = useToast();

    function handleRequestError(error) {
        if (error.response && !error.response.status === 500) {
            showToastComponent(error.response.data, "error");
        } else {
            showToastComponent("Cannot get response from server", "error");
        }
    }

    const updateTable = (isComponentMounted = true) => {
        makeGetAllProductOwnersRequest()
            .then((response) => {
                if (isComponentMounted) { //todo: is it a valid way to avoid memory leak? (we make axios request but dont change state)
                    setProductOwners(response.data)
                }
            })
            .catch((err) => {
                setProductOwners([]);
                handleRequestError(err);
            })
    }

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
    }

    const handleTableRowClick = (productOwner) => {
        setSelectedProductOwner(productOwner);
        setInvoiceDialogOpen(true);
    };

    const handleCreateProductOwnerClick = () => {
        setSelectedProductOwnerId(-1);
        setProductOwnerDialogOpen(true);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
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
                                <TableCell
                                    key={"edit_product_owner"}
                                    align={"center"}
                                >
                                    <EditIcon/>
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
                                                <Button
                                                    color={"primary"}
                                                    startIcon={<EditIcon/>}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditProductOwnerClick(client)
                                                    }}/>
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
                <Button variant="contained"
                        color={"primary"}
                        onClick={handleCreateProductOwnerClick}>
                    Add product owner
                </Button>
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
        </div>
    );
}

export default () => <BodyWrapper content={ProductOwnersTable}/>