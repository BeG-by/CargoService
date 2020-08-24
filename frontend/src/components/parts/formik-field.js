import React from "react";
import TextField from "@material-ui/core/TextField";
import '../login-form/login-form.css';
import {ErrorMsg} from "./error-message";

export const FormikField = (props) => {
    return (
        <div className="FormikField ">
            <TextField variant="standard"
                       label={props.label}
                       name={props.name}
                       type={props.type}
                       className="form-control"
                       onChange={props.obj}
                       helperText={<ErrorMsg name={props.name} />}
            />
        </div>
    )
}

export const LoginField = {
    name: 'username',
    label: 'Login',
    type: 'text'
}

export const PasswordField = {
    name: 'password',
    label: 'Password',
    type: 'password'
}