import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import ClientDialogDatePicker from "./client-dialog-date-picker";
import FormikField from "./formik-field";

import ClientCompanyTypeSelector from "./client-company-type-selector";
import { Formik, Form } from "formik";
import {
  makeDeleteClientRequest,
  makeSaveClientRequest,
  makeGetClientByIdRequest,
  makeUpdateClientRequest,
} from "./request-utils";
import { ClientFormValidationSchema } from "./validation-schema";
import useToast from "./hooks/useToast";

const EMPTY_CLIENT = {
  id: -1,
  name: "",
  payerAccountNumber: "",
  type: "SP",
  email: "",
  address: { country: "", city: "", street: "", house: "", flat: "" },
  registrationDate: new Date(),
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
  const { onSubmit, onDelete, onClose, open } = props;
  const [client, setClient] = useState(EMPTY_CLIENT);
  const [toast, openToast] = useToast();

  async function getClientById(id) {
    try {
      const response = await makeGetClientByIdRequest(id);
      setClient(response.data);
    } catch (error) {
      handleRequestError(error);
      onClose();
    }
  }

  async function saveClient(client) {
    try {
      await makeSaveClientRequest(client);
      openToast("Client has been saved", "success");
      setClient(EMPTY_CLIENT);
      onSubmit();
    } catch (error) {
      handleRequestError(error);
    }
  }

  async function updateClient(client) {
    client.id = props.clientCompanyId;
    try {
      await makeUpdateClientRequest(client);
      openToast("Client has been updated", "success");
      setClient(EMPTY_CLIENT);
      onSubmit();
    } catch (error) {
      handleRequestError(error);
    }
  }

  async function deleteClient() {
    try {
      await makeDeleteClientRequest(props.clientCompanyId);
      openToast("Client has been deleted", "success");
      setClient(EMPTY_CLIENT);
      onDelete();
    } catch (error) {
      handleRequestError(error);
    }
  }

  function handleRequestError(error) {
    if (error.response) {
      openToast(error.response.data, "error");
    } else {
      openToast("Cannot get response from server", "error");
    }
  }

  useEffect(() => {
    if (props.clientCompanyId !== -1) {
      getClientById(props.clientCompanyId);
    }
  }, [props.clientCompanyId]);

  const handleClose = () => {
    setClient(EMPTY_CLIENT);
    onClose();
  };

  const handleSubmit = (values) => {
    const client = parseClient(values);
    if (props.clientCompanyId === -1) {
      saveClient(client);
    } else {
      updateClient(client);
    }
  };

  const handleDelete = () => {
    if (props.clientCompanyId !== -1) {
      deleteClient();
    }
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
            validationSchema={ClientFormValidationSchema}
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

                <ClientDialogDatePicker
                  formikProps={formProps}
                  id="registrationDate"
                  formikFieldName="registrationDate"
                  label="Registration date"
                />
                <ClientCompanyTypeSelector
                  formikProps={formProps}
                  id="companyType"
                  formikFieldName="companyType"
                  label="Company type"
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

                <Grid
                  style={{ marginTop: 15 }}
                  container
                  justify="space-around"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={formProps.listener}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Button variant="contained" onClick={handleClose}>
                    Close
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {toast}
    </div>
  );

}
