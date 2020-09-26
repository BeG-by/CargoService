import React, {useEffect, useState} from "react";
import {Formik, Form, ErrorMessage} from "formik";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import {saveAct} from "../../roles/driver/request-utils";
import {ActFormValidation} from "./act-form-validation";
import {ProductsTable} from "./products-table";

const EMPTY_PRODUCT = {
    id: null,
    idx: -1,
    invoiceId: null,
    status: "",
    lostQuantity: 0,
    comment: "",
    name: "",
    quantity: 0,
    measure: "",
    price: 0,
    mass: "",
};

export const ActForm = (props) => {
    const [invoice, setInvoice] = useState(props.invoice);
    const [selectedProduct, setSelectedProduct] = useState(EMPTY_PRODUCT);
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [products, setProducts] = useState(props.invoice.products);

    const useStyles = makeStyles(() => ({
        formControl: {
            marginTop: 20,
            minWidth: "100%",
        }
    }));
    const classes = useStyles();

    useEffect(() => {
        setInvoice(props.invoice);
    }, [props.invoice]);

    useEffect(() => {
        setProducts(props.invoice.products);
    }, [props.invoice.products]);

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
        setProducts((prevState) => {
            const temp = [...prevState];
            for (let el of temp) {
                if (el.idx === product.idx) {
                    el.invoiceId = product.invoiceId;
                    el.status = product.status;
                    el.lostQuantity = product.lostQuantity;
                    el.comment = product.comment;
                    el.name = product.name;
                    el.quantity = product.quantity;
                    el.measure = product.measure;
                    el.price = product.price;
                    el.mass = product.mass;
                }
            }
            return temp;
        });
    };

    let date = new Date();
    let today = date.toISOString().substring(0, date.toISOString().indexOf("T"));

    const handleSubmit = (values) => {
        const act = {};
        act.invoiceId = values.invoiceId;
        act.registrationDate = today;
        act.consigneeWorker = values.consigneeWorker;
        act.products = products;
        const saveActRequest = async (act) => {
            await saveAct(act);
            props.onClose();
        };
        saveActRequest(act);
    };

    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                initialValues={{
                    invoiceId: invoice.id,
                    consigneeWorker: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={ActFormValidation}
            >
                {() => (
                    <Form>
                        <FormControl className={classes.formControl}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField name="driver"
                                               label="Driver"
                                               type="text"
                                               id="driver"
                                               disabled={true}
                                               defaultValue={props.waybill.invoice.driver.name + " "
                                               + props.waybill.invoice.driver.surname}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField name="consigneeWorker"
                                               id="consigneeWorker"
                                               label="Consignee worker"
                                               type="text"
                                    />
                                    <label style={{color: "#f50057"}}>
                                        <ErrorMessage name={"consigneeWorker"}/>
                                    </label>
                                </Grid>
                            </Grid>
                            <br/>

                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField name="shipper"
                                               label="Shipper"
                                               type="text"
                                               id="shipper"
                                               disabled={true}
                                               defaultValue={props.waybill.invoice.shipper}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField name="consignee"
                                               label="Consignee"
                                               type="text"
                                               id="consignee"
                                               disabled={true}
                                               defaultValue={props.waybill.invoice.consignee}/>
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
