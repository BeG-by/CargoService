import React from "react";
import TextField from "@material-ui/core/TextField";

export default (props) => {
    const {formikProps, formikFieldName} = props;


    return (
        <TextField
            {...props}
            margin="dense"
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            value={formikProps.values[formikFieldName]}
            fullWidth
        />
    );
};
