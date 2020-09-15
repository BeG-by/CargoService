import React from "react";
import { Formik, Form } from "formik";
import FormikField from "../../common/formik-field";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default (props) => {
  const { initProductState, onSubmit, onClose } = props;

  const handleSubmit = (values) => {
    const product = {
      name: values.name,
      measure: values.measure,
      mass: values.mass,
      quantity: values.quantity,
      price: values.price,
    };
    product.id = initProductState.id;
    onSubmit(product);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initProductState} //todo: check id on init state
      onSubmit={handleSubmit}
    >
      {(formProps) => (
        <Form>
          <FormikField
            formikProps={formProps}
            id={"name"}
            label={"Name"}
            formikFieldName={"name"}
          />
          <FormikField
            formikProps={formProps}
            id={"measure"}
            label={"Measure"}
            formikFieldName={"measure"}
          />
          <FormikField
            formikProps={formProps}
            id={"mass"}
            label={"Mass"}
            formikFieldName={"mass"}
          />
          <FormikField
            formikProps={formProps}
            id={"quantity"}
            label={"Quantity"}
            formikFieldName={"quantity"}
          />
          <FormikField
            formikProps={formProps}
            id={"price"}
            label={"Price"}
            formikFieldName={"price"}
          />
          <Grid style={{ marginTop: 15 }} container justify="space-around">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={formProps.listener}
            >
              Save
            </Button>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
