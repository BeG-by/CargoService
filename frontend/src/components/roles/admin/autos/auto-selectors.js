import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

export function AutoTypeSelector(props) {
    const {formikProps, formikFieldName, id, label} = props;
    return (
        <React.Fragment>
            <InputLabel style={{fontSize: 13}} id={id + "_label"}>
                {label}
            </InputLabel>
            <Select
                name={id}
                onChange={formikProps.handleChange}
                value={formikProps.values[formikFieldName]}
                fullWidth
            >
                <MenuItem value={"EURO_TRACK"}>Euro track</MenuItem>
                <MenuItem value={"JUMBO"}>Jumbo</MenuItem>
                <MenuItem value={"REFRIGERATOR"}>Refrigerator</MenuItem>
                
            </Select>
        </React.Fragment>
    );
}

export function AutoStatusSelector(props) {
    const {formikProps, formikFieldName, id, label} = props;
    return (
        <React.Fragment>
            <InputLabel style={{fontSize: 13}} id={id + "_label"}>
                {label}
            </InputLabel>
            <Select
                name={id}
                onChange={formikProps.handleChange}
                value={formikProps.values[formikFieldName]}
                fullWidth
            >
                <MenuItem value={"ACTIVE"}>Active</MenuItem>
                <MenuItem value={"BROKEN"}>Broken</MenuItem>

            </Select>
        </React.Fragment>
    );
}