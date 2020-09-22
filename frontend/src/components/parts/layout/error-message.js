import React from "react";
import {ErrorMessage} from "formik";

export const ErrorMsg = (props) => {
    return (
        <label className="error-message">
            <ErrorMessage name={props.name}/>
        </label>
    );
}