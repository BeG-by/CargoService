import Button from '@material-ui/core/Button';
import {validationSchemaLogin} from "../../../validation/validation-schema";
import {Form, Formik} from "formik";
import React from "react";
import {CompanyNameField, FormikField} from "../../parts/formik-field";
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

export function showRegistrationForm(object) {
    const {client} = object.state;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: client.name,
                type: '',
                pan: '',
                country: '',
                city: '',
                street: '',
                house: '',
                email: '',
                phone: '',
            }}
            validationSchema={validationSchemaLogin}
            onSubmit={object.saveClient}>
            {formProps => {
                return (
                    <Form className="form-signin">
                        <div className="form-group">
                            <FormikField obj={object.onChangeName}
                                         name={CompanyNameField.name}
                                         label={CompanyNameField.label}
                                         type={CompanyNameField.type}
                            />
                        </div>
                        <br/>
                        <SubmitButton
                            listener={formProps.isSubmitting}
                            buttonText="Save the client"
                        />
                    </Form>
                );
            }}
        </Formik>
            //todo добавить все поля формы (см formik-field.js)
    );
}