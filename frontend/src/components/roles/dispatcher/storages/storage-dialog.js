import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Form, Formik} from "formik";
import FormikField from "../formik-field";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {makeRequest, STORAGE_URL, handleRequestError} from "../../../parts/util/request-util"


const EMPTY_STORAGE = {
    id: -1,
    address: {
        country: "",
        city: "",
        street: "",
        house: ""
    },
    email: "",
    phone: "",

};


export const StorageDialog = (props) => {
    const {open, onClose, storageId, refreshTable, showToast} = props;
    const [storage, setStorage] = useState(EMPTY_STORAGE);

    const TITLE = "Storage Form";

    const isUpdateForm = storageId >= 0;

    useEffect(() => {

        if (isUpdateForm) {
            makeRequest("GET", STORAGE_URL + "/" + storageId)
                .then(res => setStorage(res.data))
                .catch(error => handleRequestError(error, setStorage))
        }
    }, [storageId]);

    const handleClose = () => {
        setStorage(EMPTY_STORAGE);
        onClose();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <span id="form-title">{TITLE}</span>
                    <IconButton aria-label="close"
                                onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            id: storageId,
                            country: storage.address.country,
                            city: storage.address.city,
                            street: storage.address.street,
                            house: storage.address.house,
                            email: storage.email,
                            phone: storage.phone
                        }}
                        onSubmit={(values) => {

                            const storage = {
                                country: values.country,
                                city: values.city,
                                street: values.street,
                                house: values.house,
                                email: values.email,
                                phone: values.phone
                            };

                            if (isUpdateForm) {

                                storage.id = values.id;

                                makeRequest("PUT", STORAGE_URL, storage)
                                    .then(res => {
                                        handleClose();
                                        refreshTable();
                                        showToast("Storage has been updated", "success")
                                    })
                                    .catch(error => handleRequestError(error, showToast))
                            } else {

                                makeRequest("POST", STORAGE_URL, storage)
                                    .then(res => {
                                        handleClose();
                                        refreshTable();
                                        showToast("Storage has been created", "success")
                                    })
                                    .catch(error => handleRequestError(error, showToast))
                            }

                        }}
                    >
                        {(formProps) => {
                            return (
                                <Form>
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
                                        id={"email"}
                                        label={"Email"}
                                        formikFieldName={"email"}
                                    />
                                    <FormikField
                                        formikProps={formProps}
                                        id={"phone"}
                                        label={"Phone"}
                                        formikFieldName={"phone"}
                                    />

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={formProps.listener}
                                    >
                                        {isUpdateForm ? "Update" : "Save"}
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
