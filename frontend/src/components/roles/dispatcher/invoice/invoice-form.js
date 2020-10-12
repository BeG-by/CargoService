import React, {useEffect, useState} from "react";
import FormikField from "../formik-field"
import {Form, Formik} from "formik";
import ProductsTable from "../products/products-table";
import ProductDialog from "../products/product-dialog";
import {InvoiceFormValidation} from "../../../parts/validation/invoice-form-validation";
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
import PersonSearch from "./search-selectors/person-search";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {UserInfo} from "../../admin/user-info";
import StorageSearch from "./search-selectors/storage-search";


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
    const {onClose, invoiceId, openToast} = props;
    const [initInvoice, setInitInvoice] = useState(INIT_INVOICE_STATE);

    const [drivers, setDrivers] = useState([]);
    const [managers, setManagers] = useState([]);
    const [storages, setStorages] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState(EMPTY_PRODUCT);
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [productIndex, setProductIndex] = useState(0);
    const [toastComponent, showToastComponent] = useToast();
    const [total, setTotal] = useState(TOTAL);

    useEffect(() => {
        updateDriversAndStoragesAndManagers();
        if (invoiceId !== null && invoiceId !== undefined) {
            fetchInitInvoiceState(invoiceId);
        } else {
            setEmptyInitInvoiceState();
        }
    }, [invoiceId, props.productOwner]);

    const validateInvoice = () => {

        if (initInvoice.consignee.id === -1) {
            showToastComponent("Select consignee", "error");
            return false;
        }

        if (initInvoice.shipper.id === -1) {
            showToastComponent("Select shipper", "error");
            return false;
        }

        if (initInvoice.shipper.id === initInvoice.consignee.id) {
            showToastComponent("Consignee and shipper have the similar address", "error");
            return false;
        }

        if (initInvoice.driver.id === -1) {
            showToastComponent("Select driver", "error");
            return false;
        }


        if (initInvoice.manager.id === -1) { // manager.id  or checkingUser?
            showToastComponent("Select manager", "error");
            return false;
        }

        return true;
    };

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
        invoice.managerId = initInvoice.manager.id; // manager.id  or checkingUser?
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
            openToast("Invoice has been saved");
            handleClose();
        } catch (error) {
            handleRequestError(error, showToastComponent);
        }
    };

    const sendInvoiceForUpdate = async (invoice) => {
        try {
            await makeRequest("PUT", INVOICE_URL, invoice);
            openToast("Invoice has been updated");
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
                manager: res.data.checkingUser
            };
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

    const handleConsigneeSelect = (storage, key) => {

        key = key.toLowerCase();

        if (storage !== null) {
            setInitInvoice((prevState) => {
                return {...prevState, [key]: storage};
            })
        } else {
            setInitInvoice((prevState) => {
                return {...prevState, [key]: EMPTY_STORAGE};
            })
        }
    };


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
                                                <p className="div-title margin-0">Customer</p>
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
                                                <p className="div-title">Information</p>
                                                <span className="invoice-input">
                                                <FormikField
                                                    formikProps={formProps}
                                                    id={"invoiceNumber"}
                                                    label={"Invoice number"}
                                                    formikFieldName={"invoiceNumber"}

                                                />
                                                </span>

                                                <StorageSearch
                                                    storages={storages}
                                                    onStorageSelect={handleConsigneeSelect}
                                                    prevStorage={initInvoice.consignee.id === -1 ? null : initInvoice.shipper}
                                                    title={STORAGE_TITLE_SHIPPER}
                                                />

                                                <StorageSearch
                                                    storages={storages}
                                                    onStorageSelect={handleConsigneeSelect}
                                                    prevStorage={initInvoice.consignee.id === -1 ? null : initInvoice.consignee}
                                                    title={STORAGE_TITLE_CONSIGNEE}
                                                />

                                                <PersonSearch
                                                    persons={drivers}
                                                    onPersonSelect={handleDriverSelect}
                                                    prevPerson={initInvoice.driver.id === -1 ? null : initInvoice.driver}
                                                    label={"Drivers"}
                                                />
                                                <PersonSearch
                                                    persons={managers}
                                                    onPersonSelect={handleManagerSelect}
                                                    prevPerson={initInvoice.manager.id === -1 ? null : initInvoice.manager}
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

                                            {initInvoice.id > 0 ?
                                                <Paper elevation={3}>
                                                    <p className="div-title">Comment</p>
                                                    <div style={{marginBottom: 20}}>
                                                        {initInvoice.comment}
                                                    </div>
                                                </Paper>
                                                : ""}

                                        </div>
                                    </div>
                                    <div className="right-div-wrapper">
                                        <UserInfo
                                            customUser={initInvoice.driver}
                                            customClass={""}
                                            title={"Driver"}

                                        />
                                        <UserInfo
                                            customUser={initInvoice.manager === undefined ? initInvoice.checkingUser : initInvoice.manager}
                                            customClass={""}
                                            title={"Manager"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="product-table-wrapper">
                                <div className="product-box">
                                    <Typography className={styles.tableHeader + " margin-0"}>
                                        <span className="div-title">CARGO LIST</span>
                                    </Typography>
                                    <div>
                                        Quantity: <span className="strong-text">{total.quantity}</span>
                                    </div>
                                    <div>
                                        Weight: <span className="strong-text">{total.weight + " KG"}</span>
                                    </div>
                                    <div>
                                        Total sum:
                                        {total.BYN === 0 ? "" :
                                            <span className="strong-text">{total.BYN} BYN</span>}
                                        {total.USD === 0 ? "" :
                                            <span className="strong-text">{total.USD} USD</span>}
                                        {total.EURO === 0 ? "" :
                                            <span className="strong-text">{total.EURO} EURO</span>}
                                        {total.RUB === 0 ? "" :
                                            <span className="strong-text">{total.RUB} RUB</span>}
                                        {total.BYN === 0 && total.USD === 0 && total.EURO === 0 && total.RUB === 0 ?
                                            <span className="strong-text">0</span> : ""}
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
                                {initInvoice.id > 0 ? "Register invoice" : "Update invoice"}
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

        </React.Fragment>
    );
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
    }
};

export default connect(mapStateToProps)(InvoiceForm);