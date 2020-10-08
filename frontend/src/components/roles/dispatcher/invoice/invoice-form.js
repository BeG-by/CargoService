import React, {useEffect, useState} from "react";
import FormikField from "../formik-field"
import {Form, Formik} from "formik";
import ProductsTable from "../products/products-table";
import ProductDialog from "../products/product-dialog";
import {InvoiceFormValidation} from "./validation-shema";
import {Button} from "@material-ui/core";
import useToast from "../../../parts/toast-notification/useToast";
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import LibraryAddRoundedIcon from '@material-ui/icons/LibraryAddRounded';
import {
    DATA_FOR_INVOICE_CREATING_URL,
    handleRequestError,
    INVOICE_URL,
    makeRequest
} from "../../../parts/util/request-util";
import "../styles/invoice-form.css"
import PersonSearch from "./person-search";
import StorageSearchDialog from "./storage-search/storage-search-dialog";
import TextField from "@material-ui/core/TextField";
import {UserInfoInvoice} from "../../admin/user-info-invoice";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";


const STORAGE_TITLE_SHIPPER = "Shipper";
const STORAGE_TITLE_CONSIGNEE = "Consignee";

const useStyles = makeStyles((theme) => ({
    infoPiece: {
        flexDirection: "column",
        alignItems: "flex-start"
    },
    boldText: {
        fontWeight: "bold",
    },
    tableHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5,
        fontSize: 20
    }
}));

export const EMPTY_MANAGER = {
    id: -1,
    name: "",
    surname: "",
    passport: "",
};

export const EMPTY_DRIVER = {
    id: -1,
    name: "",
    surname: "",
    passport: "",
};

const EMPTY_STORAGE = {
    id: -1,
    address: {
        country: "",
        city: "",
        street: "",
        house: "",
        flat: "",
    },
    phone: "",
    email: "",
}

const EMPTY_PRODUCT_OWNER = {
    name: "",
    type: "Sole proprietorship",
    phone: "",
};

const EMPTY_PRODUCT = {
    id: -1,
    name: "",
    quantityMeasure: "PIECE",
    quantity: "",
    massMeasure: "KG",
    mass: "",
    price: "",
    currency: "BYN",
};

const INIT_INVOICE_STATE = {
    number: "",
    shipper: EMPTY_STORAGE,
    consignee: EMPTY_STORAGE,
    registrationDate: "",
    driver: EMPTY_DRIVER,
    manager: EMPTY_MANAGER,
    productOwner: EMPTY_PRODUCT_OWNER,
    products: [],
};

const TOTAL = {
    BYN: 0,
    USD: 0,
    EURO: 0,
    RUB: 0,
    weight: 0,
    quantity: 0
};

function InvoiceForm(props) {
    const styles = useStyles();
    const {onClose} = props;
    const [initInvoice, setInitInvoice] = useState(INIT_INVOICE_STATE);

    const [drivers, setDrivers] = useState([]);
    const [managers, setManagers] = useState([]);
    const [storages, setStorages] = useState([]);
    const [storageDialogOpen, setStorageDialogOpen] = useState(false);
    const [storageDialogTitle, setStorageDialogTitle] = useState(STORAGE_TITLE_SHIPPER)

    const [selectedProduct, setSelectedProduct] = useState(EMPTY_PRODUCT);
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [productIndex, setProductIndex] = useState(0);
    const [toastComponent, showToastComponent] = useToast();
    const [total, setTotal] = useState(TOTAL);

    useEffect(() => {
        updateDriversAndStoragesAndManagers();
        if (props.invoiceId !== null && props.invoiceId !== undefined) {
            fetchInitInvoiceState(props.invoiceId);
        } else {
            setEmptyInitInvoiceState();
        }
    }, [props.invoiceId, props.productOwner]);

    const validateInvoice = () => {
        if (initInvoice.consignee.id === -1) {
            showToastComponent("Select consignee", "error");
            return false;
        }

        if (initInvoice.shipper.id === -1) {
            showToastComponent("Select shipper", "error");
            return false;
        }

        if (initInvoice.driver.id === -1) {
            showToastComponent("Select driver", "error");
            return false;
        }

        if (initInvoice.manager.id === -1) {
            showToastComponent("Select manager", "error");
            return false;
        }

        return true;
    }

    const handleSubmit = (values) => {
        let invoice = {};

        if (!validateInvoice()) {
            return;
        }

        invoice.invoiceNumber = values.invoiceNumber;
        invoice.shipperId = initInvoice.shipper.id;
        invoice.consigneeId = initInvoice.consignee.id;
        invoice.productOwnerId = initInvoice.productOwner.id;
        invoice.products = initInvoice.products;
        invoice.registrationDate = initInvoice.registrationDate;
        invoice.driverId = initInvoice.driver.id;
        invoice.managerId = initInvoice.manager.id;
        invoice.status = "REGISTERED";

        if (props.invoiceId !== null && props.invoiceId !== undefined) {
            invoice.id = props.invoiceId;
            sendInvoiceForUpdate(invoice);
        } else {
            sendInvoiceForSave(invoice);
        }
    };

    const handleClose = () => {
        setInitInvoice(INIT_INVOICE_STATE);
        setSelectedProduct(EMPTY_PRODUCT);
        setProductIndex(0);

        onClose();
    };

    const updateDriversAndStoragesAndManagers = async () => {
        try {
            const res = await makeRequest("GET", DATA_FOR_INVOICE_CREATING_URL);
            setDrivers(res.data.drivers);
            setStorages(res.data.storages);
            setManagers(res.data.managers);
        } catch (error) {
            setDrivers([]);
            handleRequestError(error, showToastComponent);
        }
    };

    const sendInvoiceForSave = async (invoice) => {
        try {
            await makeRequest("POST", INVOICE_URL, invoice);
            showToastComponent("Invoice has been saved");
            handleClose();
        } catch (error) {
            handleRequestError(error, showToastComponent);
        }
    };

    const sendInvoiceForUpdate = async (invoice) => {
        try {
            await makeRequest("PUT", INVOICE_URL, invoice);
            showToastComponent("Invoice has been updated");
            handleClose();
        } catch (error) {
            handleRequestError(error, showToastComponent);
        }
    };

    const fetchInitInvoiceState = async (id) => {
        try {
            const res = await makeRequest("GET", INVOICE_URL + "/" + id);
            let invoiceState = {
                ...res.data,
                productOwner: res.data.productOwnerDTO,
            }
            invoiceState.productOwner.type = invoiceState.productOwner.type === "SP" ? "Sole proprietorship" : "Juridical person";
            setInitInvoice(invoiceState);
        } catch (error) {
            setInitInvoice(INIT_INVOICE_STATE);
            handleRequestError(error, showToastComponent);
        }
    };

    function setEmptyInitInvoiceState() {
        setInitInvoice((prevState) => {
            let invoiceState = {
                ...prevState,
                registrationDate: new Date().toISOString().slice(0, 10),
                productOwner: props.productOwner,
            }
            invoiceState.productOwner.type = invoiceState.productOwner.type === "SP" ? "Sole proprietorship" : "Juridical person";
            return invoiceState;
        });
    }


    const handleProductDialogClose = () => {
        setSelectedProduct(EMPTY_PRODUCT);
        setProductDialogOpen(false);
    };

    const handleProductDelete = (id) => {
        if (id !== -1) {
            deleteProductById(id);
        }
    };

    const handleProductDialogSubmit = (product) => {
        if (product.id === -1) {
            addProduct(product);
        } else {
            updateProduct(product);
        }
        setSelectedProduct(EMPTY_PRODUCT);
        setProductDialogOpen(false);
    };

    const handleCreateNewProductClick = () => {
        setSelectedProduct(EMPTY_PRODUCT);
        setProductDialogOpen(true);
    };

    const handleProductTableClick = (product, isOpen = true) => {
        setSelectedProduct(product);
        setProductDialogOpen(true);
    };

    const addProduct = (product) => {
        product.id = productIndex;
        setProductIndex(product.id + 1);
        setInitInvoice((prevState) => {
            const temp = [...prevState.products];
            temp.push(product);
            return {...prevState, products: temp};
        });
    };

    const updateProduct = (newProduct) => {
        setInitInvoice((prevState) => {
            const temp = [...prevState.products];
            for (let el of temp) {
                if (el.id === newProduct.id) {
                    el.name = newProduct.name;
                    el.massMeasure = newProduct.massMeasure;
                    el.mass = newProduct.mass;
                    el.quantityMeasure = newProduct.quantityMeasure;
                    el.quantity = newProduct.quantity;
                    el.price = newProduct.price;
                    el.currency = newProduct.currency;
                }
            }
            return {...prevState, products: temp};
        });
    };

    const deleteProductById = (id) => {
        setInitInvoice((prevState) => {
            const temp = [...prevState.products];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].id === id) {
                    temp.splice(i, 1);
                }
            }
            return {...prevState, products: temp};
        });
    };


    const handleTotal = (total) => {
        setTotal(total);
    };

    const handleDriverSelect = (driver) => {
        if (driver === null) {
            setInitInvoice((prevState) => {
                return {...prevState, driver: EMPTY_DRIVER};
            })
        } else {
            setInitInvoice((prevState) => {
                return {...prevState, driver: driver};
            })
        }
    }

    const handleManagerSelect = (manager) => {
        if (manager === null) {
            setInitInvoice((prevState) => {
                return {...prevState, manager: EMPTY_DRIVER};
            })
        } else {
            setInitInvoice((prevState) => {
                return {...prevState, manager: manager};
            })
        }
    }

    const handleStorageSelect = (storage) => {
        if (storage !== null) {
            if (storageDialogTitle === STORAGE_TITLE_CONSIGNEE) {
                setInitInvoice((prevState) => {
                    return {...prevState, consignee: storage};
                })
            } else {
                setInitInvoice((prevState) => {
                    return {...prevState, shipper: storage};
                })
            }
        } else {
            if (storageDialogTitle === STORAGE_TITLE_CONSIGNEE) {
                setInitInvoice((prevState) => {
                    return {...prevState, consignee: EMPTY_STORAGE};
                })
            } else {
                setInitInvoice((prevState) => {
                    return {...prevState, shipper: EMPTY_STORAGE};
                })
            }
        }
    }

    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                initialValues={{
                    invoiceNumber: initInvoice.number,
                }}
                onSubmit={handleSubmit}
                validationSchema={InvoiceFormValidation}
            >
                {(formProps) => (
                    <Form className="invoice-form">
                        <div className="container-wrapper">
                            <div className="invoice-data-wrapper">
                                <div className="customer-data-wrapper">
                                    <div className="left-div-wrapper">
                                        <div className="customer-wrapper">
                                            <Paper elevation={3}>
                                                <span>Customer</span> //TODO font
                                                <div className="customer-paper">
                                                    <div>
                                                        <p>Company name</p>
                                                        {initInvoice.productOwner.name}
                                                    </div>
                                                    <div>
                                                        <p>Phone</p>
                                                        {initInvoice.productOwner.phone}
                                                    </div>
                                                </div>
                                            </Paper>
                                        </div>
                                        <div className="data-wrapper">
                                            <Paper elevation={3}>
                                                <h2>Information</h2>
                                                <FormikField
                                                    formikProps={formProps}
                                                    id={"invoiceNumber"}
                                                    label={"Invoice number"}
                                                    formikFieldName={"invoiceNumber"}
                                                />
                                                <TextField
                                                    id={"shipper"}
                                                    value={initInvoice.shipper.email}
                                                    onClick={() => {
                                                        setStorageDialogTitle(STORAGE_TITLE_SHIPPER)
                                                        setStorageDialogOpen(true)
                                                    }}
                                                    label={"Shipper"}
                                                    fullWidth
                                                />
                                                <TextField
                                                    id={"consignee"}
                                                    value={initInvoice.consignee.email}
                                                    onClick={() => {
                                                        setStorageDialogTitle(STORAGE_TITLE_CONSIGNEE)
                                                        setStorageDialogOpen(true)
                                                    }}
                                                    label={"Consignee"}
                                                    fullWidth
                                                />

                                                <PersonSearch
                                                    persons={drivers}
                                                    onPersonSelect={handleDriverSelect}
                                                    label={"Drivers"}
                                                />
                                                <PersonSearch
                                                    persons={managers}
                                                    onPersonSelect={handleManagerSelect}
                                                    label={"Managers"}
                                                />
                                                <div className="registration-date">
                                                    <div>
                                                        <p>Date of registration</p>
                                                        {initInvoice.registrationDate}
                                                    </div>
                                                    <div>
                                                        <p>Registration person</p>
                                                        {props.user.name + " " + props.user.surname}
                                                    </div>
                                                </div>
                                            </Paper>
                                        </div>
                                    </div>
                                    <div className="right-div-wrapper">
                                        <UserInfoInvoice
                                            user={initInvoice.driver}
                                        />

                                        <UserInfoInvoice
                                            user={initInvoice.manager}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="product-table-wrapper">
                                <div className="product-box">
                                    <Typography className={styles.tableHeader}>
                                        CARGO LIST
                                    </Typography>
                                    <div >
                                        Quantity: {total.quantity}
                                    </div>
                                    <div>
                                        Weight: {total.weight + " KG"}
                                    </div>
                                    <div>
                                        Total sum:
                                        {total.BYN === 0 ? "" :
                                            <span>BYN: {total.BYN}</span>}
                                        {total.USD === 0 ? "" :
                                            <span>USD: {total.USD}</span>}
                                        {total.EURO === 0 ? "" :
                                            <span>EURO: {total.EURO}</span>}
                                        {total.RUB === 0 ? "" :
                                            <span>RUB: {total.RUB}</span>}
                                        {total.BYN === 0 && total.USD === 0 && total.EURO === 0 && total.RUB === 0 ?
                                            <span>0</span> : ""}
                                    </div>
                                    <Button variant="contained"
                                            color="primary"
                                            onClick={handleCreateNewProductClick}>
                                        <LibraryAddRoundedIcon/>
                                    </Button>
                                </div>
                                <ProductsTable
                                    products={initInvoice.products}
                                    onRowClick={handleProductTableClick}
                                    onAddProduct={handleTotal}
                                    onRowDelete={handleProductDelete}
                                />
                            </div>
                        </div>
                        <div className="reg-btn">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={formProps.listener}
                            >
                                Register invoice
                            </Button>
                        </div>

                    </Form>
                )}
            </Formik>
            {toastComponent}
            <ProductDialog
                open={productDialogOpen}
                initProductState={selectedProduct}
                onSubmit={handleProductDialogSubmit}
                onClose={handleProductDialogClose}
            />

            <StorageSearchDialog
                open={storageDialogOpen}
                storages={storages}
                onSelect={handleStorageSelect}
                title={storageDialogTitle}
                onClose={() => setStorageDialogOpen(false)}
                prevStorage={storageDialogTitle === STORAGE_TITLE_CONSIGNEE ?
                    initInvoice.consignee.id === -1 ? null : initInvoice.consignee
                    :
                    initInvoice.shipper.id === -1 ? null : initInvoice.shipper
                }
            />

        </React.Fragment>
    );
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
    }
};

export default connect(mapStateToProps)(InvoiceForm);