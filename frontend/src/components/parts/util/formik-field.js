import React from "react";
import TextField from "@material-ui/core/TextField";
import {ErrorMessage} from "formik";

export default (props) => {
    const {formikProps, formikFieldName} = props;
    return (
        <React.Fragment>
            <TextField
                {...props}
                margin="dense"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                value={formikProps.values[formikFieldName]}
                fullWidth
            />
            <label className="error-message">
                <ErrorMessage name={formikFieldName}/>
            </label>
        </React.Fragment>

    );
};

export const FormikTextArea = (props) => {
    const {formikProps, formikFieldName} = props;
    return (
        <React.Fragment>
            <TextField
                {...props}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                value={formikProps.values[formikFieldName]}
                multiline
            />
            <br/>
            <label className="error-message">
                <ErrorMessage name={formikFieldName}/>
            </label>
        </React.Fragment>

    );
}