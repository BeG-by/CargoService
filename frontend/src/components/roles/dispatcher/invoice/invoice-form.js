import React, {useEffect, useState} from "react";
import FormikField from "../formik-field";
import {Formik, Form} from "formik";
import ItemList from "../item-list";
import ProductsTable from "../products/products-table";
import ProductDialog from "../products/product-dialog";
import {InvoiceFormValidation} from "./validation";
import {Button} from "@material-ui/core";
import {
    makeGetAllDriversRequest,
    makeSaveInvoiceRequest,
} from "../request-utils";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const EMPTY_DRIVER = {
    name: "",
    surname: "",
    passport: "",
};

const EMPTY_PRODUCT = {
    id: -1,
    name: "",
    measure: "",
    mass: "",
    quantity: "",
    price: "",
};

export default (props) => {
    const [selectedDriver, setSelectedDriver] = useState(EMPTY_DRIVER);
    const [selectedProduct, setSelectedProduct] = useState(EMPTY_PRODUCT);
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [productIndex, setProductIndex] = useState(0);
    const [drivers, setDrivers] = useState([]);
    const [products, setProducts] = useState([]);

    const updateDriversList = async () => {
        try {
            const res = await makeGetAllDriversRequest();
            setDrivers(res.data);
        } catch (error) {
            setDrivers([]);
            handleRequestError(error);
        }
    };

    useEffect(() => {
        updateDriversList();
    }, []);

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

    const handleTableRowClick = (product) => {
        setSelectedProduct(product);
        setProductDialogOpen(true);
    };

    const addProduct = (product) => {
        product.id = productIndex;
        setProductIndex(product.id + 1);
        setProducts((prevState) => {
            const temp = [...prevState];
            temp.push(product);
            return temp;
        });
    };

    const updateProduct = (newProduct) => {
        setProducts((prevState) => {
            const temp = [...prevState];
            for (let el of temp) {
                if (el.id === newProduct.id) {
                    el.name = newProduct.name;
                    el.measure = newProduct.measure;
                    el.mass = newProduct.mass;
                    el.quantity = newProduct.quantity;
                    el.price = newProduct.price;
                }
            }
            return temp;
        });
    };

    const deleteProductById = (id) => {
        setProducts((prevState) => {
            const temp = [...prevState];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].id === id) {
                    temp.splice(i, 1);
                }
            }
            return temp;
        });
    };

    const handleRequestError = (error) => {
        console.log(error.response);
        if (error.response && error.response.status !== 500) {
            alert(error.response.data);
            // openToast(error.response.data, "error");
        } else {
            alert("Cannot get response from server");
            // openToast("Cannot get response from server", "error");
        }
    };

    const deleteIdAttribute = (products) => {
        let productsWithoutId = [];
        for (let product of products) {
            let newProduct = {};
            newProduct.name = product.name;
            newProduct.mass = product.mass;
            newProduct.quantity = product.quantity;
            newProduct.measure = product.measure;
            newProduct.price = product.price;
            //todo: fix sum (add formik field)
            newProduct.sum = newProduct.price;
            productsWithoutId.push(newProduct);
        }
        return productsWithoutId;
    }

    const handleSubmit = (values) => {
        const invoice = {};
        invoice.products = deleteIdAttribute(products);
        invoice.driverId = selectedDriver.id;
        invoice.invoiceNumber = values.invoiceNumber;
        invoice.shipper = values.shipper;
        invoice.consignee = values.consignee;
        invoice.status = "REGISTERED";
        invoice.registrationDate = new Date().toISOString().slice(0, 10);

        const saveInvoice = async (invoice) => {
            try {
                await makeSaveInvoiceRequest(invoice);
                alert("Saved");
                props.onClose();
            } catch (error) {
                handleRequestError(error);
            }
        };
        console.log(invoice);
        saveInvoice(invoice);
    };

    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                initialValues={{
                    invoiceNumber: "",
                    shipper: "",
                    consignee: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={InvoiceFormValidation}
            >
                {(formProps) => (
                    <Form>
                        <TextField
                            disabled={true}
                            id={"productOwnerName"}
                            label={"Product owner name"}
                            value={props.productOwner.name}
                        />
                        <TextField
                            disabled={true}
                            id="productOwnerType"
                            label="Product owner type"
                            value={props.productOwner.type}
                        />
                        <TextField
                            disabled={true}
                            id={"productOwnerPhone"}
                            label={"Product owner phone"}
                            value={props.productOwner.phone}
                        />

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

                        <TextField
                            disabled={true}
                            id={"invoiceRegistrationDate"}
                            label={"Invoice registration date"}
                            value={new Date().toISOString().slice(0, 10)}
                        />
                        <TextField
                            disabled={true}
                            id={"driverName"}
                            label={"Driver name"}
                            value={selectedDriver.name}
                        />
                        <TextField
                            disabled={true}
                            id={"driverSurname"}
                            label={"Driver surname"}
                            value={selectedDriver.surname}
                        />
                        <TextField
                            disabled={true}
                            id={"driverPassport"}
                            label={"Driver passport"}
                            value={selectedDriver.passport}
                        />
                        <ItemList
                            items={drivers}
                            onRowClick={(item) => {
                                setSelectedDriver(item);
                            }}
                        />

                        <div style={{marginBottom: 20}}>
                            <ProductsTable
                                products={products}
                                onRowClick={handleTableRowClick}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateNewProductClick}>
                                Add new product
                            </Button>
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={formProps.listener}
                        >
                            Register invoice
                        </Button>

                        <ProductDialog
                            open={productDialogOpen}
                            initProductState={selectedProduct}
                            onSubmit={handleProductDialogSubmit}
                            onDelete={handleProductDelete}
                            onClose={handleProductDialogClose}
                        />
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
};
