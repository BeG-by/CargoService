import React, {useEffect, useState} from "react";
import FormikField from "../formik-field";
import {Form, Formik} from "formik";
import ItemList from "../item-list";
import ProductsTable from "../products/products-table";
import ProductDialog from "../products/product-dialog";
import {InvoiceFormValidation} from "./validation-shema";
import {Button} from "@material-ui/core";
import {
    makeGetAllDriversRequest,
    makeGetInvoiceByIdRequest,
    makeSaveInvoiceRequest,
    makeUpdateInvoiceRequest,
} from "../request-utils";
import useToast from "../../../parts/toast-notification/useToast";
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import TableBody from "@material-ui/core/TableBody";

const EMPTY_DRIVER = {
    name: "",
    surname: "",
    passport: "",
};

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
    shipper: "",
    consignee: "",
    registrationDate: "",
    driver: EMPTY_DRIVER,
    productOwner: EMPTY_PRODUCT_OWNER,
    products: [],
};

const TOTAL = {
    BYN: 0,
    USD: 0,
    EURO: 0,
    RUB: 0,
    weight: 0
};

function InvoiceForm(props) {
    const {onClose} = props;
    const [initInvoice, setInitInvoice] = useState(INIT_INVOICE_STATE);
    const [drivers, setDrivers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(EMPTY_PRODUCT);
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [productIndex, setProductIndex] = useState(0);
    const [toastComponent, showToastComponent] = useToast();
    const [total, setTotal] = useState(TOTAL);

    useEffect(() => {
        updateDriversList();
        if (props.invoiceId !== null && props.invoiceId !== undefined) {
            fetchInitInvoiceState(props.invoiceId);
        } else {
            setEmptyInitInvoiceState();
        }
    }, [props.invoiceId, props.productOwner]);

    const handleSubmit = (values) => {
        let invoice = {};
        invoice.invoiceNumber = values.invoiceNumber;
        invoice.shipper = values.shipper;
        invoice.consignee = values.consignee;

        invoice.productOwnerId = initInvoice.productOwner.id;
        invoice.products = initInvoice.products;
        invoice.registrationDate = initInvoice.registrationDate;
        invoice.driverId = initInvoice.driver.id;
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
    }

    const updateDriversList = async () => {
        try {
            const res = await makeGetAllDriversRequest();
            setDrivers(res.data);
        } catch (error) {
            setDrivers([]);
            handleRequestError(error);
        }
    };

    const sendInvoiceForSave = async (invoice) => {
        try {
            await makeSaveInvoiceRequest(invoice);
            showToastComponent("Invoice has been saved");
            handleClose();
        } catch (error) {
            handleRequestError(error);
        }
    };

    const sendInvoiceForUpdate = async (invoice) => {
        try {
            await makeUpdateInvoiceRequest(invoice);
            showToastComponent("Invoice has been updated");
            handleClose();
        } catch (error) {
            handleRequestError(error);
        }
    };

    const fetchInitInvoiceState = async (id) => {
        try {
            const res = await makeGetInvoiceByIdRequest(id);
            let invoiceState = {
                ...res.data,
                productOwner: res.data.productOwnerDTO,
            }
            invoiceState.productOwner.type = invoiceState.productOwner.type === "SP" ? "Sole proprietorship" : "Juridical person";
            setInitInvoice(invoiceState);
        } catch (error) {
            setInitInvoice(INIT_INVOICE_STATE);
            handleRequestError(error);
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
            handleProductDialogClose();
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

    const handleProductTableClick = (product) => {
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

    const handleRequestError = (error) => {
        if (error.response && error.response.status !== 500) {
            showToastComponent(error.response.data, "error");
        } else {
            showToastComponent("Cannot get response from server", "error");
        }
    };

    const handleTotal = (total) => {
        setTotal(total);
    };

    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                initialValues={{
                    invoiceNumber: initInvoice.number,
                    shipper: initInvoice.shipper,
                    consignee: initInvoice.consignee,
                }}
                onSubmit={handleSubmit}
                validationSchema={InvoiceFormValidation}
            >
                {(formProps) => (
                    <Form className="invoice-form">
                        <div className="invoice-data-wrapper">
                            <div className="customer-data-wrapper">
                                <div className="left-div-wrapper">
                                    <div className="customer-wrapper">
                                        <h2>Customer</h2>
                                        <Paper elevation={3} className="customer-paper">
                                            <div>
                                                <p>Company name</p>
                                                {initInvoice.productOwner.name}
                                            </div>
                                            <div>
                                                <p>Phone</p>
                                                {initInvoice.productOwner.phone}
                                            </div>
                                        </Paper>
                                    </div>
                                    <div className="data-wrapper">
                                        <h2>Data</h2>
                                        <Paper elevation={3}>
                                            <FormikField
                                                formikProps={formProps}
                                                id={"invoiceNumber"}
                                                label={"Invoice number"}
                                                formikFieldName={"invoiceNumber"}
                                            />

                                            <FormikField
                                                formikProps={formProps}
                                                id={"shipper"}
                                                label={"Shipper"}
                                                formikFieldName={"shipper"}
                                            />
                                            <FormikField
                                                formikProps={formProps}
                                                id={"consignee"}
                                                label={"Consignee"}
                                                formikFieldName={"consignee"}
                                            />
                                            <ItemList
                                                items={drivers}
                                                onRowClick={(item) => {
                                                    setInitInvoice((prevState) => {
                                                        return {...prevState, driver: item};
                                                    });
                                                }}
                                            />
                                        </Paper>
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
                                    </div>
                                </div>
                                <div className="right-div-wrapper">
                                    <h2>Driver</h2>
                                    <Paper elevation={3} className="driver-info">
                                        <div>
                                            <p>Name</p>
                                            {initInvoice.driver.name}
                                        </div>
                                        <div>
                                            <p>Surname</p>
                                            {initInvoice.driver.surname}
                                        </div>
                                        <div>
                                            <p>Patronymic</p>
                                            {initInvoice.driver.patronymic}
                                        </div>
                                        <div>
                                            <p>Date of birth</p>
                                            {initInvoice.driver.birthday}
                                        </div>
                                        <div>
                                            <p>Passport</p>
                                            {initInvoice.driver.passport}
                                        </div>
                                    </Paper>
                                    <h2>Total</h2>
                                    <Paper elevation={3} className="driver-info">
                                        <div>
                                            <p>Price</p>
                                            {total.BYN === 0 ? "" :
                                                <div>BYN: {total.BYN}</div>}
                                            {total.USD === 0 ? "" :
                                                <div>USD: {total.USD}</div>}
                                            {total.EURO === 0 ? "" :
                                                <div>EURO: {total.EURO}</div>}
                                            {total.RUB === 0 ? "" :
                                                <div>RUB: {total.RUB}</div>}
                                            {total.BYN === 0 && total.USD === 0 && total.EURO === 0 && total.RUB === 0 ?
                                                <div>0</div> : ""}
                                        </div>
                                        <div>
                                            <p>Weight</p>
                                            {total.weight + " kg"}
                                        </div>
                                    </Paper>
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={formProps.listener}
                            >
                                Register invoice
                            </Button>
                        </div>
                        <div className="product-table-wrapper">
                            <h2>Products</h2>
                            <Button variant="contained"
                                    color="primary"
                                    onClick={handleCreateNewProductClick}>
                                +
                            </Button>
                            <ProductsTable
                                products={initInvoice.products}
                                onRowClick={handleProductTableClick}
                                onAddProduct={handleTotal}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
            {toastComponent}
            <ProductDialog
                open={productDialogOpen}
                initProductState={selectedProduct}
                onSubmit={handleProductDialogSubmit}
                onDelete={handleProductDelete}
                onClose={handleProductDialogClose}
            />

        </React.Fragment>
    );
};

const mapStateToProps = (store) => {
    return {
        user: store.user,
    }
};

export default connect(mapStateToProps)(InvoiceForm);