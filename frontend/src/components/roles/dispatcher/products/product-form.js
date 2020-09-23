import React from "react";
import {Formik, Form} from "formik";
import FormikField from "../formik-field";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {ProductFormValidationSchema} from "./validation";
import ProductMassMeasureSelector from "./product-mass-measure-selector";
import ProductQuantityMeasureSelector from "./product-quantity-measure-selector";
import ProductCurrencySelector from "./product-currency-selector";

export default function ProductForm(props) {
    const {initProductState, onSubmit, onDelete} = props;

    const handleDelete = () => {
        onDelete(initProductState.id);
    };

    const handleSubmit = (values) => {
        const product = {
            name: values.name,
            quantityMeasure: values.quantityMeasure,
            quantity: values.quantity,
            massMeasure: values.massMeasure,
            mass: values.mass,
            price: values.price,
            currency: values.currency,
        };
        product.id = initProductState.id;
        onSubmit(product);
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initProductState}
            onSubmit={handleSubmit}
            validationSchema={ProductFormValidationSchema}
        >
            {(formProps) => (
                <Form>
                    <FormikField
                        formikProps={formProps}
                        id={"name"}
                        label={"Name"}
                        formikFieldName={"name"}
                    />
                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid item xs={7}>
                            <FormikField
                                formikProps={formProps}
                                id={"quantity"}
                                label={"Quantity"}
                                formikFieldName={"quantity"}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <ProductQuantityMeasureSelector
                                formikProps={formProps}
                                id={"quantityMeasure"}
                                label={" "}
                                formikFieldName={"quantityMeasure"}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid item xs={7}>
                            <FormikField
                                formikProps={formProps}
                                id={"mass"}
                                label={"Mass"}
                                formikFieldName={"mass"}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <ProductMassMeasureSelector
                                formikProps={formProps}
                                id={"massMeasure"}
                                label={" "}
                                formikFieldName={"massMeasure"}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid item xs={7}>
                            <FormikField
                                formikProps={formProps}
                                id={"price"}
                                label={"Price"}
                                formikFieldName={"price"}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <ProductCurrencySelector
                                formikProps={formProps}
                                id={"currency"}
                                label={" "}
                                formikFieldName={"currency"}
                            />
                        </Grid>
                    </Grid>


                    <Grid style={{marginTop: 15}} container justify="space-around">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={formProps.listener}
                        >
                            Save
                        </Button>
                        {initProductState.id === -1 ? "" :
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        }
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}
;
