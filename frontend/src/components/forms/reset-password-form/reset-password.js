import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import {Form, Formik} from "formik";
import FormikField from "../../parts/util/formik-field";
import useToast from "../../parts/toast-notification/useToast";
import {withRouter} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {ResetPasswordScheme} from "../../parts/validation/reset-password-validation";
import {handleRequestError, makeRequest, REGISTRATION_URL, RESET_PASSWORD_URL} from "../../parts/util/request-util";


export function ChangePasswordForm(props) {

    const [toast, showToast] = useToast();
    const [code, setCode] = useState("");

    useEffect(() => {
        let href = window.location.href;
        let url = new URL(href);
        let code = url.searchParams.get("code");

        if (code === null || code === undefined) {
            props.history.push("/")
        }

        setCode(code)

    }, []);

    return (
        <main>
            <div className="reset-password-form">
                <Paper elevation={3}>
                    <header>
                        Reset password
                    </header>
                    <Formik
                        enableReinitialize
                        validationSchema={ResetPasswordScheme}
                        initialValues={{
                            password: "",
                            confirm: "",
                        }}
                        onSubmit={(values) => {

                            const passwordRequest = {
                                password: values.password,
                                confirm: values.confirm,
                                code: code
                            };

                            if (passwordRequest.password !== passwordRequest.confirm) {
                                showToast("Passwords don't match", "error");
                            } else {

                                makeRequest("POST", RESET_PASSWORD_URL, passwordRequest)
                                    .then(res => {
                                        showToast(res.data, "success");
                                        setTimeout(() => window.location.href = "/", 2000)
                                    })
                                    .catch(error => handleRequestError(error, showToast))
                            }

                        }}
                    >
                        {(formProps) => {
                            return (
                                <Form className="password-form">
                                    <FormikField
                                        formikProps={formProps}
                                        id={"password"}
                                        label={"Password"}
                                        formikFieldName={"password"}
                                        type="password"
                                    />
                                    <FormikField
                                        formikProps={formProps}
                                        id={"confirm"}
                                        label={"Confirm your password"}
                                        formikFieldName={"confirm"}
                                        type="password"
                                    />
                                    <div className="btn-form-wrapper">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={formProps.listener}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                    {toast}
                </Paper>
            </div>
        </main>
    );
}

export default withRouter(ChangePasswordForm);