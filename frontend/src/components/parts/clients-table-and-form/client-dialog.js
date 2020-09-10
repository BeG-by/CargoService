import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form } from "formik";
import FormikField from "./formik-field";
import { getClientById, saveClient } from "./request-utils";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const EMPTY_CLIENT = {
  id: -1,
  name: "",
  payerAccountNumber: "",
  type: "",
  email: "",
  address: { country: "", city: "", street: "", house: "", flat: "" },
  registrationDate: "",
};

function parseClient(values) {
  return {
    name: values.name,
    payerAccountNumber: values.payerAccountNumber,
    type: values.companyType,
    email: values.email,
    country: values.country,
    city: values.city,
    street: values.street,
    house: values.house,
    flat: values.flat,
    registrationDate: values.registrationDate,
  };
}

export default function ClientDialog(props) {
  const { onSubmit, open, onClose } = props;
  const [client, setClient] = useState(EMPTY_CLIENT);

  useEffect(() => {
    async function fetchClient() {
      setClient(await getClientById(props.clientCompanyId));
    }

    if (props.clientCompanyId >= 0) {
      fetchClient();
    }
  }, [props.clientCompanyId]);

  const handleClose = () => {
    setClient(EMPTY_CLIENT);
    onClose();
  };

  const handleSubmit = (values) => {
    const client = parseClient(values);
    saveClient(client).then(() => {
      setClient(EMPTY_CLIENT);
      onSubmit();
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{client.name}</DialogTitle>
        <DialogContent>
          <Formik
            enableReinitialize
            initialValues={{
              name: client.name,
              payerAccountNumber: client.payerAccountNumber,
              companyType: client.type,
              email: client.email,
              country: client.address.country,
              city: client.address.city,
              street: client.address.street,
              house: client.address.house,
              flat: client.address.flat,
              registrationDate: client.registrationDate,
            }}
            onSubmit={handleSubmit}
            // validationSchema={ClientFormValidationSchema}
          >
            {(formProps) => {
              return (
                <Form className="form-signin">
                  <FormikField
                    formikProps={formProps}
                    id={"name"}
                    label={"Name"}
                    formikFieldName={"name"}
                  />
                  <FormikField
                    formikProps={formProps}
                    id={"payerAccountNumber"}
                    label={"Payer account number"}
                    formikFieldName={"payerAccountNumber"}
                  />
                  <FormikField
                    formikProps={formProps}
                    id={"email"}
                    label={"Email"}
                    formikFieldName={"email"}
                  />
                  <FormikField
                    formikProps={formProps}
                    id={"country"}
                    label={"Country"}
                    formikFieldName={"country"}
                  />
                  <FormikField
                    formikProps={formProps}
                    id={"city"}
                    label={"City"}
                    formikFieldName={"city"}
                  />
                  <FormikField
                    formikProps={formProps}
                    id={"street"}
                    label={"Street"}
                    formikFieldName={"street"}
                  />
                  <InputLabel style={{ fontSize: 13 }} id="company-type-label">
                    Company type
                  </InputLabel>
                  <Select
                    name="companyType"
                    onChange={formProps.handleChange}
                    value={formProps.values.companyType}
                    fullWidth
                  >
                    <MenuItem value={"SP"}>Sole proprietorship</MenuItem>
                    <MenuItem value={"JP"}>Juridical person</MenuItem>
                  </Select>
                  <FormikField
                    formikProps={formProps}
                    id={"house"}
                    label={"House"}
                    formikFieldName={"house"}
                  />
                  <FormikField
                    formikProps={formProps}
                    id={"flat"}
                    label={"Flat"}
                    formikFieldName={"flat"}
                  />
                  <FormikField
                    formikProps={formProps}
                    id={"registrationDate"}
                    label={"Registration date"}
                    formikFieldName={"registrationDate"}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={formProps.listener}
                  >
                    Save
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
