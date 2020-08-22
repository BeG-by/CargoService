import RaisedButton from 'material-ui/RaisedButton';
import {validationSchema} from "../../validation/validation-schema";
import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";

export function showError(object) {
    return <div className="form-signin">
        <h2>Something goes wrong...</h2>
        <RaisedButton onClick={object.goBack}>
            back
        </RaisedButton>
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
                    <h2 className="form-signin-heading">Sign in, please</h2>
                    <div style={{color: 'crimson', fontSize: '18px'}}>
                        <ErrorMessage name="username"/>
                    </div>
                    <div className="form-group">
                        <Field type="text"
                               className="form-control"
                               name="username"
                               placeholder="login"
                               maxLength="16"
                               onChange={object.onChangeLogin}
                        />
                    </div>
                    <br/>
                    <div style={{color: 'crimson', fontSize: '18px'}}>
                        <ErrorMessage name="password"/>
                    </div>
                    <div className="form-group">
                        <Field type="password"
                               className="form-control"
                               name="password"
                               placeholder="password"
                               maxLength="16"
                               onChange={object.onChangePassword}
                        />
                    </div>
                    <br/>
                    <RaisedButton type="submit" disabled={formProps.isSubmitting}>
                        sign in
                    </RaisedButton>
                </Form>
            );
        }}
    </Formik>;
}