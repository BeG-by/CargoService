import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from "@material-ui/core/DialogContent";
import {handleRequestError, makeRequest, USER_URL} from "../../parts/util/request-util";
import {Form, Formik} from "formik";
import FormikField from "../../parts/util/formik-field";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {PasswordScheme} from "../../parts/validation/profile-validation";


export default function ChangePassword(props) {

    const {showToastComponent, open, onClose} = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle id="form-dialog-title">
                <span id="form-title">Password</span>
                <IconButton aria-label="close"
                            onClick={onClose}
                            className="close-user-dialog-btn"
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className="password-dialog">
                <Formik
                    enableReinitialize
                    validationSchema={PasswordScheme}
                    initialValues={{
                        oldPassword: "",
                        newPassword: "",
                        confirmNewPassword: ""
                    }}
                    onSubmit={(values) => {

                        const passwordRequest = {
                            oldPassword: values.oldPassword,
                            newPassword: values.newPassword,
                            confirmNewPassword: values.confirmNewPassword
                        };

                        if (passwordRequest.newPassword !== passwordRequest.confirmNewPassword) {
                            showToastComponent("Passwords don't match ", "error");
                        } else {

                            makeRequest("PUT", USER_URL + "/password", passwordRequest)
                                .then(res => {
                                    showToastComponent("Password has been updated", "success");
                                    onClose();
                                }).catch(error => handleRequestError(error, showToastComponent))
                        }

                    }}
                >
                    {(formProps) => {
                        return (
                            <Form className="password-form">
                                <FormikField
                                    formikProps={formProps}
                                    id={"oldPassword"}
                                    label={"Old password"}
                                    formikFieldName={"oldPassword"}
                                    type="password"
                                />
                                <FormikField
                                    formikProps={formProps}
                                    id={"newPassword"}
                                    label={"New password"}
                                    formikFieldName={"newPassword"}
                                    type="password"
                                />
                                <FormikField
                                    formikProps={formProps}
                                    id={"confirmNewPassword"}
                                    label={"Confirm new password"}
                                    formikFieldName={"confirmNewPassword"}
                                    type="password"
                                />
                                <div className="btn-form-wrapper">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={formProps.listener}
                                    >
                                        Change password
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