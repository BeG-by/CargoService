import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Form, Formik} from "formik";
import FormikField from "../../parts/util/formik-field"
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeUserAndCompany} from "../../store/actions";
import {withRouter} from "react-router-dom";
import {ValidationSchemaEmail, ValidationSchemaPassword} from "../../parts/validation/login-form-validation";
import '../forms.css';
import useToast from "../../parts/toast-notification/useToast";
import {LOGIN_URL, makeRequest} from "../../parts/util/request-util";


export const LoginForm = (props) => {

    const {open, onClose, history} = props;
    const [toast, showToast] = useToast();
    const [resetOpen, setResetOpen] = useState(false);

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <span id="form-title">{resetOpen ? "Reset password" : " Sign in the Cargo system"}</span>
                    <IconButton aria-label="close"
                                onClick={onClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {resetOpen ? <ResetPasswordForm/> :
                        <Formik
                            enableReinitialize
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={ValidationSchemaEmail.concat(ValidationSchemaPassword)}
                            onSubmit={(values) => {

                                makeRequest("POST", LOGIN_URL, {email: values.email, password: values.password})
                                    .then(res => {
                                        localStorage.setItem("authorization", res.data.token);
                                        props.changeUserAndCompany(res.data.user, res.data.company);
                                        history.push("/main");
                                    })
                                    .catch(error => {
                                        let message = error.response.data;
                                        if (error.response && error.response.status !== 500) {
                                            if (message.startsWith("User not found")) {
                                                showToast("Email doesn't exist")
                                            } else {
                                                showToast(error.response.data, "error");
                                            }
                                        } else {
                                            showToast("Operation was failed. Cannot get response from server", "error");
                                        }
                                    })

                            }}
                        >
                            {(formProps) => {
                                return (
                                    <Form className="login-form">
                                        <FormikField
                                            formikProps={formProps}
                                            id={"email"}
                                            label={"Email"}
                                            formikFieldName={"email"}
                                        />
                                        <FormikField
                                            formikProps={formProps}
                                            id={"password"}
                                            label={"Password"}
                                            formikFieldName={"password"}
                                            type={"password"}
                                        />
                                        <div className="reset-password" onClick={() => setResetOpen(true)}>
                                            Forgot your password ?
                                        </div>
                                        <div style={{textAlign: "center", marginTop: 10, margiBottom: 5}}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={formProps.listener}
                                            >
                                                SIGN IN
                                            </Button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    }
                </DialogContent>
                {toast}
            </Dialog>
        </div>
    );
};


export const ResetPasswordForm = () => {

    return (
        <Formik
            enableReinitialize
            initialValues={{
                email: "",
            }}
            validationSchema={ValidationSchemaEmail}
            onSubmit={(values) => {
                console.log(values)
            }}
        >
            {(formProps) => {
                return (
                    <Form className="login-form">
                        <div className="text-info">
                            Please, enter your email and we will send you instructions on how to reset your password
                        </div>
                        <FormikField
                            formikProps={formProps}
                            id={"email"}
                            label={"Email"}
                            formikFieldName={"email"}
                        />
                        <div style={{textAlign: "center", marginTop: 10, margiBottom: 5}}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={formProps.listener}
                            >
                                CONFIRM
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};


const mapActionsToProps = (dispatch) => {
    return {
        changeUserAndCompany: bindActionCreators(changeUserAndCompany, dispatch)
    }
};

export default withRouter(connect(null, mapActionsToProps)(LoginForm));
