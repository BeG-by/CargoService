import React from "react";
import TextField from "@material-ui/core/TextField";

export default (props) => {
    const { formikProps, formikFieldName, id, label } = props;
    return (
        <TextField
            margin="dense"
            id={id}
            label={label}
            type="text"
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            value={formikProps.values[formikFieldName]}
            fullWidth
        />
    );
};
