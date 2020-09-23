import React, {useEffect, useState} from "react";
import {Formik, Form, ErrorMessage} from "formik";
import TextField from "@material-ui/core/TextField";

export default function ActForm(props) {
return (
    <Formik initialValues={props.values} onSubmit={props.onSubmit}>
        <Form>
            <TextField>
                {props.form}
            </TextField>
        </Form>
    </Formik>
)
}