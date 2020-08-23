import Button from '@material-ui/core/Button';
import {validationSchema} from "../../validation/validation-schema";
import {ErrorMessage, Form, Formik} from "formik";
import React from "react";
import {FormikField, LoginField, PasswordField} from "../parts/formik-field";

export function showError(object) {
    return <div className="form-signin">
        <h2>Something goes wrong...</h2>
        <Button variant="contained" color="secondary" onClick={object.goBack}>
            back
        </Button>
    </div>;
}

export function showLoginForm(object) {
    const {user} = object.state;
    return <Formik
        enableReinitialize
        initialValues={{
            username: user.login,
            password: user.password
        }}
        validationSchema={validationSchema}
        onSubmit={object.searchByLoginPass}>
        {formProps => {
            return (
                <Form className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <div className="error-message">
                        <ErrorMessage name="username"/>
                    </div>
                    <div className="form-group">
                        <FormikField obj={object.onChangeLogin}
                                     name={LoginField.name}
                                     label={LoginField.label}
                                     type={LoginField.type}
                        />
                    </div>
                    <br/>
                    <div className="error-message">
                        <ErrorMessage name="password"/>
                    </div>
                    <div className="form-group">
                        <FormikField obj={object.onChangePassword}
                                     name={PasswordField.name}
                                     label={PasswordField.label}
                                     type={PasswordField.type}/>
                    </div>
                    <br/>
                    <Button variant="contained"
                            color="primary"
                            type="submit"
                            disabled={formProps.isSubmitting}>
                        sign in
                    </Button>
                </Form>
            );
        }}
    </Formik>;
}