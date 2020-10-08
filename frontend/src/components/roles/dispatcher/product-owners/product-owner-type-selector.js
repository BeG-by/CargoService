import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import {ErrorMessage} from "formik";

export default function ProductOwnerTypeSelector(props) {
    const {formikProps, formikFieldName, id, label, disabled} = props;
    return (
        <React.Fragment>
            <InputLabel style={{fontSize: 13}} id={id + "_label"}>
                {label}
            </InputLabel>
            <Select
                disabled={disabled}
                name={id}
                onChange={formikProps.handleChange}
                value={formikProps.values[formikFieldName]}
                fullWidth
            >
                <MenuItem value={"JP"}>Juridical person</MenuItem>
                <MenuItem value={"SP"}>Sole proprietorship</MenuItem>

            </Select>
            <label className="error-message">
                <ErrorMessage name={formikFieldName}/>
            </label>
        </React.Fragment>
    );
}
