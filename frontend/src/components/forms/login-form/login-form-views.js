import Button from '@material-ui/core/Button';
import {validationSchemaLogin} from "../../../validation/validation-schema";
import {Form, Formik} from "formik";
import React from "react";
import {FormikField, LoginField, PasswordField} from "../../parts/formik-field";
import {SubmitButton} from "../../parts/buttons/submit-button";

export function showError(object) {
    return (
        <div className="form-signin">
            <p className="error-text">{object.state.errorText}</p>
            <Button variant="contained" color="secondary" onClick={object.goBack}>
                back
            </Button>
        </div>);
}

export function showLoginForm(object) {
    const {user} = object.state;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                username: user.login,
                password: user.password
            }}
            validationSchema={validationSchemaLogin}
            onSubmit={object.searchByLoginPass}>
            {formProps => {
                return (
                    <Form className="form-signin">

                            <FormikField obj={object.onChangeLogin}
                                         name={LoginField.name}
                                         label={LoginField.label}
                                         type={LoginField.type}
                            />


                            <FormikField obj={object.onChangePassword}
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