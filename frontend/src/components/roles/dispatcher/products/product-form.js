import React from "react";
import {Form, Formik} from "formik";
import FormikField from "../formik-field";
import Button from "@material-ui/core/Button";
import {ProductFormValidationSchema} from "../../../parts/validation/products-validation";
import {ProductCurrencySelector, ProductMassMeasureSelector, ProductQuantityMeasureSelector} from "./product-selectors";

export default function ProductForm(props) {
    const {initProductState, onSubmit} = props;

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
                <Form style={{width: 400}}>
                    <FormikField
                        formikProps={formProps}
                        id={"name"}
                        label={"Name"}
                        formikFieldName={"name"}
                    />

                    <FormikField
                        formikProps={formProps}
                        id={"quantity"}
                        label={"Quantity"}
                        formikFieldName={"quantity"}
                    />

                    <ProductQuantityMeasureSelector
                        formikProps={formProps}
                        id={"quantityMeasure"}
                        label={"Quantity measure"}
                        formikFieldName={"quantityMeasure"}
                    />

                    <FormikField
                        formikProps={formProps}
                        id={"mass"}
                        label={"Mass"}
                        formikFieldName={"mass"}
                    />

                    <ProductMassMeasureSelector
                        formikProps={formProps}
                        id={"massMeasure"}
                        label={"Mass measure"}
                        formikFieldName={"massMeasure"}/>


                    <FormikField
                        formikProps={formProps}
                        id={"price"}
                        label={"Price"}
                        formikFieldName={"price"}
                    />

                    <ProductCurrencySelector
                        formikProps={formProps}
                        id={"currency"}
                        label={"Currency"}
                        formikFieldName={"currency"}
                    />

                    <div className="button-form-wrapper">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={formProps.listener}
                        >
                            {initProductState.id === -1 ? "Save" : "Update"}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
