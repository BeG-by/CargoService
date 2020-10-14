import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import {ErrorMessage} from "formik";

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
            <label className="error-message">
                <ErrorMessage name={formikFieldName}/>
            </label>
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
            <label className="error-message">
                <ErrorMessage name={formikFieldName}/>
            </label>
        </React.Fragment>
    );
}

export function UserTemplateSelector(props) {
    const {formikProps, formikFieldName, id, label, onSelect, templates} = props;
    return (
        <React.Fragment>
            <InputLabel style={{fontSize: 13}} id={id + "_label"}>
                {label}
            </InputLabel>
            <Select
                name={id}
                onChange={(e) => {
                    formikProps.handleChange(e);
                    let value = e.target.value === "" ? "" : templates[e.target.value];
                    onSelect(value)
                }}
                value={formikProps.values[formikFieldName]}
                style={{width: 200, marginBottom: 10}}
            >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"BIRTHDAY"}>Birthday</MenuItem>
                <MenuItem value={"BLOCKED"}>Blocked</MenuItem>
            </Select>
            <label className="error-message">
                <ErrorMessage name={formikFieldName}/>
            </label>
        </React.Fragment>
    );
}
