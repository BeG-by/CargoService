import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from "@material-ui/core/DialogContent";
import {handleRequestError, makeRequest, USER_URL} from "../../parts/util/request-util";
import {Form, Formik} from "formik";
import FormikField from "../../parts/util/formik-field";
import {copyUser} from "../../parts/util/function-util";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {PhoneScheme} from "../../parts/validation/profile-validation";


export default function ChangePhoneDialog(props) {

    const {showToastComponent, user, changeUser, open, onClose} = props;

    return (
        <Dialog open={open} onClose={onClose} className="phone-dialog-container">
            <DialogTitle id="form-dialog-title">
                <span id="form-title">Phone</span>
                <IconButton aria-label="close"
                            onClick={onClose}
                            className="close-user-dialog-btn"
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Formik
                    enableReinitialize
                    validationSchema={PhoneScheme}
                    initialValues={{
                        phone: user.phone,
                    }}
                    onSubmit={(values) => {
                        const phone = values.phone;

                        makeRequest("PUT", USER_URL + "/phone", {phone})
                            .then(res => {
                                showToastComponent("Phone has been updated", "success");
                                user.phone = phone;
                                changeUser(copyUser(user));
                                onClose();
                            }).catch(error => handleRequestError(error, showToastComponent))

                    }}
                >
                    {(formProps) => {
                        return (
                            <Form className="phone-form">
                                <FormikField
                                    formikProps={formProps}
                                    id={"phone"}
                                    label={"Phone"}
                                    formikFieldName={"phone"}
                                />
                                <div className="btn-form-wrapper">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={formProps.listener}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}