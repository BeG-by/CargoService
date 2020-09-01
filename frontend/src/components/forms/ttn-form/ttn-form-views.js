import Button from "@material-ui/core/Button";
import {Form, Formik} from "formik";
import {validationSchema} from "../../../validation/validation-schema";
import {FormikField, LoginField, PasswordField} from "../../parts/formik-field";
import {SubmitButton} from "../../parts/buttons/submit-button";
import React from "react";

export function showError(object) {
    return (
        <div className="form-signin">
            <p className="error-text">{object.state.errorText}</p>
            <Button variant="contained" color="secondary" onClick={object.goBack}>
                back
            </Button>
        </div>);
}

export function showTtnForm(object) {
    const {ttn} = object.state;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                username: ttn.login,
                password: ttn.password
            }}
            validationSchema={validationSchema}
            onSubmit={object.searchByLoginPass}>
            {formProps => {
                return (
                    <Form className="form-signin">
                        <div className="form-group">
                            <FormikField obj={object.onChangeLogin}
                                         name={LoginField.name}
                                         label={LoginField.label}
                                         type={LoginField.type}
                            />
                        </div>
                        <div className="form-group">
                            <FormikField obj={object.onChangePassword}
                                         name={PasswordField.name}
                                         label={PasswordField.label}
                                         type={PasswordField.type}/>
                        </div>
                        <br/>
                        <SubmitButton
                            listener={formProps.isSubmitting}
                            buttonText="send form"
                        />
                    </Form>
                );
            }}
        </Formik>
    );
}