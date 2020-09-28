import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Form, Formik} from "formik";
import FormikField from "../formik-field";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {AUTO_URL, makeRequest} from "../request-util"
import {AutoTypeSelector} from "./auto-selectors";


const EMPTY_AUTO = {
    id: -1,
    mark: "",
    type: "",

};


export const AutoDialog = (props) => {
    const {open, onClose, autoId, refreshTable, showToast, handleError} = props;
    const [auto, setAuto] = useState(EMPTY_AUTO);

    const isUpdateForm = autoId >= 0;

    useEffect(() => {

        if (isUpdateForm) {
            makeRequest("GET", AUTO_URL + "/" + autoId)
                .then(res => {
                    setAuto(res.data);
                }).catch(error => handleError(error))
        }
    }, [autoId]);

    const handleClose = () => {
        setAuto(EMPTY_AUTO);
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
                    <span id="form-title">User Form</span>
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
                            id: autoId,
                            mark: auto.mark,
                            type: auto.autoType,
                        }}
                        onSubmit={(values) => {

                            const auto = {
                                mark: values.mark,
                                autoType: values.type,
                                };

                            if (isUpdateForm) {

                                auto.id = values.id;
                                
                                makeRequest("PUT", AUTO_URL, auto)
                                    .then(res => {
                                        handleClose();
                                        refreshTable();
                                        showToast("Auto has been updated", "success")
                                    })
                                    .catch(error => {
                                        handleError(error)
                                    })
                            } else {

                                makeRequest("POST", AUTO_URL, auto)
                                    .then(res => {
                                        handleClose();
                                        refreshTable();
                                        showToast("Auto has been created", "success")
                                    })
                                    .catch(error => {
                                        handleError(error)
                                    })
                            }

                        }}
                    >
                        {(formProps) => {
                            return (
                                <Form>
                                    <FormikField
                                        formikProps={formProps}
                                        id={"mark"}
                                        label={"Mark"}
                                        formikFieldName={"mark"}
                                    />
                                    <AutoTypeSelector
                                        formikProps={formProps}
                                        id={"type"}
                                        label={"Type"}
                                        formikFieldName={"type"}
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
