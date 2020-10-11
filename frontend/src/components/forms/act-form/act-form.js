import React, {useEffect, useState} from "react";
import {ErrorMessage, Form, Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import {ActFormValidation} from "../../parts/validation/act-form-validation";
import {ProductsTable} from "./products-table";
import ProductsDialog from "./products-dialog";
import FormikField from "../../roles/sysadmin/formik-field";
import {ACT_URL, makeRequest} from "../../parts/util/request-util";

export const ActForm = (props) => {
    const invoice = props.invoice;
    const EMPTY_PRODUCT = {
        id: 0,
        invoiceId: invoice.id,
        productStatus: "",
        lostQuantity: 0,
        comment: "",
        name: "",
        quantity: 0,
        quantityMeasure: "",
        price: 0,
        currency: "",
        mass: "",
        massMeasure: "",
    };
    const [selectedProduct, setSelectedProduct] = useState(EMPTY_PRODUCT);
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [products, setProducts] = useState(invoice.products);
    const [count, setCount] = useState(0);

    const useStyles = makeStyles(() => ({
        formControl: {
            marginTop: 20,
            minWidth: "100%",
        }
    }));
    const classes = useStyles();

    useEffect(() => {
        setProducts(invoice.products);
    }, [invoice.products]);

    const handleTableRowClick = (product) => {
        setSelectedProduct(product);
        setProductDialogOpen(true);
    };

    const handleProductDialogClose = () => {
        setSelectedProduct(EMPTY_PRODUCT);
        setProductDialogOpen(false);
    };

    const handleProductDialogSubmit = (product) => {
        updateProduct(product);
        setSelectedProduct(EMPTY_PRODUCT);
        setProductDialogOpen(false);
    };

    const updateProduct = (product) => {
        let lost = 0;
        setProducts((prevState) => {
            const temp = [...prevState];
            for (let el of temp) {
                if (el.id === product.id) {
                    el.id = product.id;
                    el.productStatus = product.productStatus;
                    el.lostQuantity = product.lostQuantity;
                    if (product.lostQuantity > 0) {
                        lost++;
                    }
                    el.comment = product.comment;
                    el.name = product.name;
                    el.quantity = product.quantity;
                    el.quantityMeasure = product.quantityMeasure;
                    el.price = product.price;
                    el.currency = product.currency;
                    el.mass = product.mass;
                    el.massMeasure = product.massMeasure;
                }
            }
            setCount(lost);
            return temp;
        });
    };

    let date = new Date();
    let today = date.toISOString().substring(0, date.toISOString().indexOf("T"));

    const handleSubmit = (values) => {
        let statusProducts = [];
        products.forEach(p => {
            if (p.productStatus === "ACCEPTED") {
                p.comment = "delivered";
                p.productStatus = "DELIVERED";
            }
            statusProducts.push(p);
        })
        const act = {};
        act.invoiceId = invoice.id;
        act.registrationDate = today;
        act.consigneeWorker = values.consigneeWorker;
        act.products = statusProducts;
        const saveActRequest = async (act) => {
            await makeRequest("POST", ACT_URL, act);
            if (props.onSave) {
                props.onSave();
            }
            props.onClose();
        };
        saveActRequest(act);
    };

    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                initialValues={{
                    consigneeWorker: "",
                    productsCount: count
                }}
                onSubmit={handleSubmit}
                validationSchema={ActFormValidation}
            >
                {(formProps) => (
                    <Form>
                        <FormControl className={classes.formControl}>
                            <Grid container spacing={3}>
                                <Grid item md={6}>
                                    <TextField style={{width: "100%"}}
                                               name="driver"
                                               label="Driver"
                                               type="text"
                                               id="driver"
                                               disabled={true}
                                               defaultValue={invoice.driver.name + " "
                                               + invoice.driver.surname}/>
                                </Grid>
                                <Grid item md={6}>
                                    <FormikField
                                        formikProps={formProps}
                                        id={"consigneeWorker"}
                                        label={"Consignee worker"}
                                        formikFieldName={"consigneeWorker"}
                                    />
                                </Grid>
                            </Grid>
                            <br/>

                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField style={{width: "100%"}}
                                               name="shipper"
                                               label="Shipper"
                                               type="text"
                                               id="shipper"
                                               disabled={true}
                                               defaultValue={`${invoice.shipper.address.country} ${invoice.shipper.address.city} ${invoice.shipper.address.street} ${invoice.shipper.email}`}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField style={{width: "100%"}}
                                               name="consignee"
                                               label="Consignee"
                                               type="text"
                                               id="consignee"
                                               disabled={true}
                                               defaultValue={`${invoice.consignee.address.country} ${invoice.consignee.address.city} ${invoice.consignee.address.street} ${invoice.consignee.email}`}/>
                                </Grid>
                            </Grid>
                        </FormControl>
                        <br/>

                        <FormControl className={classes.formControl}>

                            <InputLabel id="demo-simple-select-label">Products</InputLabel>
                            <ProductsTable
                                editable={true}
                                products={products}
                                onRowClick={handleTableRowClick}/>

                            <TextField name="productsCount"
                                       type="number"
                                       disabled={true}
                                       onChange={formProps.handleChange}
                            >{count}</TextField>
                            <label style={{color: "#f50057", fontSize: 10}}>
                                <ErrorMessage name={"productsCount"}/>
                            </label>

                            <ProductsDialog
                                open={productDialogOpen}
                                initProductState={selectedProduct}
                                onSubmit={handleProductDialogSubmit}
                                onClose={handleProductDialogClose}
                            />
                        </FormControl>
                        <br/>

                        <div className='btn-row'>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Save act
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={props.onClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
};
