import React, {useState} from "react";
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
import {
    handleRequestError,
    LOGIN_URL,
    makeRequest, OAUTH_GITHUB,
    OAUTH_LOGIN_URL,
    RESET_PASSWORD_MAIL_URL
} from "../../parts/util/request-util";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Tooltip from "@material-ui/core/Tooltip";
import GoogleLogin from "react-google-login";
import {GithubLoginButton, GoogleLoginButton} from "react-social-login-buttons";


export const LoginFormWeb = (props) => {

    const {open, onClose, history} = props;
    const [toast, showToast] = useToast();
    const [resetOpen, setResetOpen] = useState(false);

    const CLIENT_ID = "321725933906-8kmoujml8tgeesc5ugatmlce8ub9tedj.apps.googleusercontent.com";


    const onGoogleLogin = (res) => {

        makeRequest("POST", OAUTH_LOGIN_URL, {accessToken: res.accessToken, email: res.profileObj.email})
            .then(res => {
                    localStorage.setItem("authorization", res.data.token);
                    props.changeUserAndCompany(res.data.user, res.data.company);
                    history.push("/main");
                }
            ).catch(error => handleRequestError(error, showToast))
    };


    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <span id="form-title">{resetOpen ? "Reset password" : "Sign in the Cargo system"}</span>
                    <IconButton aria-label="close"
                                onClick={onClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {resetOpen ?
                        <ResetPasswordForm
                            showToast={showToast}
                            comeBack={setResetOpen}
                        /> :
                        <div>
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
                                            <div className={"buttons-login-div"}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    disabled={formProps.listener}
                                                    style={{fontSize: 18, textTransform: "none"}}
                                                >
                                                    Sign in
                                                </Button>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                            <div className={"buttons-login-div"}>
                                <GoogleLogin
                                    clientId={CLIENT_ID}
                                    render={renderProps => (
                                        <GoogleLoginButton
                                            disabled={renderProps.disabled}
                                            onClick={renderProps.onClick}
                                            text={"Sign in with Google"}
                                            style={{fontSize: 18}}
                                        />
                                    )}
                                    onSuccess={onGoogleLogin}
                                    scope={"email"}
                                    cookiePolicy={'single_host_origin'}
                                />

                                <GithubLoginButton
                                    onClick={() => {
                                        window.location.href = OAUTH_GITHUB;
                                    }}
                                    text={"Sign in with GitHub"}
                                    style={{fontSize: 18}}
                                />
                            </div>
                        </div>

                    }
                </DialogContent>
                {toast}
            </Dialog>
        </div>
    );
};


export const ResetPasswordForm = (props) => {

    const {showToast, comeBack} = props;

    return (
        <Formik
            enableReinitialize
            initialValues={{
                email: "",
            }}
            validationSchema={ValidationSchemaEmail}
            onSubmit={(values) => {
                showToast("Email is sending...", "info")
                makeRequest("POST", RESET_PASSWORD_MAIL_URL, {email: values.email})
                    .then(res => showToast(res.data))
                    .catch(error => handleRequestError(error, showToast))
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
                        <div className="login-confirm-div margin-bottom">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={formProps.listener}
                            >
                                CONFIRM
                            </Button>
                            <div className="back-arrow">
                                <Tooltip title="Back to sign in"
                                         arrow>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        onClick={() => comeBack(false)}
                                    >
                                        <ArrowBackRoundedIcon/>
                                    </Button>
                                </Tooltip>
                            </div>
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

export default withRouter(connect(null, mapActionsToProps)(LoginFormWeb));
