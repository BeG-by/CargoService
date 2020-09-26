import React from "react";
import { Formik, Form } from "formik";
import FormikField from "../../roles/sysadmin/formik-field";
import Button from "@material-ui/core/Button";
import {ProductFormValidation} from "./act-form-validation";

export default (props) => {
    const { initProductState, onSubmit, onClose } = props;

    const handleSubmit = (values) => {
        const product = {
            id: initProductState.id,
            invoiceId: initProductState.invoiceId,
            status: "LOST",
            lostQuantity: values.quantity,
            comment: values.comment,
            name: initProductState.name,
            quantity: initProductState.quantity,
            measure: initProductState.measure,
            price: initProductState.price,
            mass: initProductState.mass,
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