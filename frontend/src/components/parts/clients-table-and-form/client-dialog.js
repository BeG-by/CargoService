import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import ClientDialogDatePicker from "./client-dialog-date-picker";
import FormikField from "./formik-field";

import ClientCompanyTypeSelector from "./client-company-type-selector";
import {Formik, Form} from "formik";
import {
    getClientById,
    saveClient,
    updateClient,
    deleteClient,
} from "./request-utils";
import {ClientFormValidationSchema} from "./validation-schema";

const EMPTY_CLIENT = {
    id: -1,
    name: "",
    payerAccountNumber: "",
    type: "",
    email: "",
    address: {country: "", city: "", street: "", house: "", flat: ""},
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
    const {onSubmit, onDelete, onClose, open} = props;
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
        if (props.clientCompanyId === -1) {
            saveClient(client).then(() => {
                alert("Client was saved!");
                setClient(EMPTY_CLIENT);
                onSubmit();
            });
        } else {
            client.id = props.clientCompanyId;
            updateClient(client).then(() => {
                alert("Client was updated!");
                setClient(EMPTY_CLIENT);
                onSubmit();
            });
        }
    };

    const handleDeleteClick = () => {
        if (props.clientCompanyId !== -1) {
            deleteClient(props.clientCompanyId).then(() => {
                alert("Client was deleted");
                setClient(EMPTY_CLIENT);
                onDelete();
            });
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
                                        style={{marginTop: 15}}
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
                                            onClick={handleDeleteClick}
                                        >
                                            Delete
                                        </Button>
                                        <Button variant="contained" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Grid>
                                </Form>
                            );
                        }}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
}
