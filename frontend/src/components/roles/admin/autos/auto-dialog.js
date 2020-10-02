import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Form, Formik} from "formik";
import FormikField from "../../../parts/util/formik-field";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {AUTO_URL, handleRequestError, makeRequest} from "../../../parts/util/request-util"
import {AutoStatusSelector, AutoTypeSelector} from "./auto-selectors";
import CustomDatePicker from "../custom-date-picker";


const EMPTY_AUTO = {
    id: -1,
    mark: "",
    number: "",
    autoType: "",
    consumption: "",
    dateOfIssue: "",
    status: "",

};


export const AutoDialog = (props) => {
    const {open, onClose, autoId, refreshTable, showToast} = props;
    const [auto, setAuto] = useState(EMPTY_AUTO);
    const TITLE = "Auto";

    const isUpdateForm = autoId >= 0;

    useEffect(() => {

        if (isUpdateForm) {
            makeRequest("GET", AUTO_URL + "/" + autoId)
                .then(res => {
                    setAuto(res.data);
                }).catch(error => handleRequestError(error, showToast))
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
                            id: autoId,
                            mark: auto.mark,
                            number: auto.number,
                            autoType: auto.autoType,
                            consumption: auto.consumption,
                            dateOfIssue: auto.dateOfIssue,
                            status: auto.status,
                        }}
                        onSubmit={(values) => {

                            const auto = {
                                mark: values.mark,
                                number: values.number,
                                autoType: values.autoType,
                                consumption: values.consumption,
                                dateOfIssue: values.dateOfIssue,
                                status: values.status,
                            };

                            if (isUpdateForm) {

                                auto.id = values.id;

                                makeRequest("PUT", AUTO_URL, auto)
                                    .then(res => {
                                        handleClose();
                                        refreshTable();
                                        showToast("Auto has been updated", "success")
                                    })
                                    .catch(error => handleRequestError(error, showToast))

                            } else {

                                makeRequest("POST", AUTO_URL, auto)
                                    .then(res => {
                                        handleClose();
                                        refreshTable();
                                        showToast("Auto has been created", "success")
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
                                        id={"mark"}
                                        label={"Mark"}
                                        formikFieldName={"mark"}
                                    />
                                    <FormikField
                                        formikProps={formProps}
                                        id={"number"}
                                        label={"Number"}
                                        formikFieldName={"number"}
                                    />
                                    <AutoTypeSelector
                                        formikProps={formProps}
                                        id={"autoType"}
                                        label={"Type"}
                                        formikFieldName={"autoType"}
                                    />
                                    <FormikField
                                        formikProps={formProps}
                                        id={"consumption"}
                                        label={"Consumption (liter / 100 km)"}
                                        formikFieldName={"consumption"}
                                    />
                                    <CustomDatePicker
                                        formikProps={formProps}
                                        id={"dateOfIssue"}
                                        label={"Date of issue"}
                                        formikFieldName={"dateOfIssue"}
                                    />

                                    {isUpdateForm ? <AutoStatusSelector
                                        formikProps={formProps}
                                        id={"status"}
                                        label={"Status"}
                                        formikFieldName={"status"}
                                    /> : ""}

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
};
