import Button from '@material-ui/core/Button';
import {validationSchemaLogin} from "./validation";
import {Form, Formik} from "formik";
import React from "react";
import {FormikField, LoginField, PasswordField} from "./formik-field";
import {SubmitButton} from "../../parts/buttons/submit-button";

export function LoginFormError(form) {
    return (
        <div className="form-signin">
            <p className="error-text">{form.state.errorText}</p>
            <Button variant="contained" color="secondary" onClick={form.goBack}>
                back
            </Button>
        </div>);
}

export function LoginFormView(form) {
    const {user} = form.state;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                username: user.login,
                password: user.password
            }}
            validationSchema={validationSchemaLogin}
            onSubmit={form.searchByLoginPass}>
            {formProps => {
                return (
                    <Form className="form-signin">
                            <FormikField obj={form.onChangeLogin}
                                         name={LoginField.name}
                                         label={LoginField.label}
                                         type={LoginField.type}
                            />
                            <FormikField obj={form.onChangePassword}
                                         name={PasswordField.name}
                                         label={PasswordField.label}
                                         type={PasswordField.type}/>
                        <br/>
                        <SubmitButton
                            listener={formProps.isSubmitting}
                            buttonText="sign in"
                        />
                    </Form>
                );
            }}
        </Formik>
    );
}