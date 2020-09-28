import React from "react";
import { Formik, Form } from "formik";
import FormikField from "../../roles/sysadmin/formik-field";
import Button from "@material-ui/core/Button";
import {ProductFormValidation} from "../../parts/validation/act-form-validation";

export default (props) => {
    const { initProductState, onSubmit, onClose } = props;

    const handleSubmit = (values) => {
        const product = {
            id: initProductState.id,
            invoiceId: initProductState.invoiceId,
            productStatus: "LOST",
            lostQuantity: values.lostQuantity,
            comment: values.comment,
            currency: values.currency,
            name: initProductState.name,
            quantity: initProductState.quantity,
            quantityMeasure: initProductState.quantityMeasure,
            price: initProductState.price,
            mass: initProductState.mass,
            massMeasure: initProductState.massMeasure,
        };
        product.idx = initProductState.idx;
        onSubmit(product);
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initProductState}
            onSubmit={handleSubmit}
            validationSchema={ProductFormValidation}
        >
            {(formProps) => (
                <Form>
                    <FormikField
                        formikProps={formProps}
                        id={"lostQuantity"}
                        label={"Lost Quantity"}
                        formikFieldName={"lostQuantity"}
                    />
                    <FormikField
                        formikProps={formProps}
                        id={"comment"}
                        label={"Comment"}
                        formikFieldName={"comment"}
                    />
                    <div className="btn-row">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Fix loss
                        </Button>
                        <Button
                            variant="outlined"
                            color='primary'
                            onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};