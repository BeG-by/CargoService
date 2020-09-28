import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

export function UserTypeSelector(props) {
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
                <MenuItem value={"ADMIN"}>Administrator</MenuItem>
                <MenuItem value={"DISPATCHER"}>Dispatcher</MenuItem>
                <MenuItem value={"MANAGER"}>Manager</MenuItem>
                <MenuItem value={"DRIVER"}>Driver</MenuItem>
                <MenuItem value={"OWNER"}>Company owner</MenuItem>
            </Select>
        </React.Fragment>
    );
}

export function UserStatusSelector(props) {
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
                <MenuItem value={"BLOCKED"}>Blocked</MenuItem>
            </Select>
        </React.Fragment>
    );
}
