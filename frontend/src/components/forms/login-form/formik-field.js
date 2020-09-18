import React from "react";
import TextField from "@material-ui/core/TextField";
import '../forms.css';
import {ErrorMsg} from "../../parts/error-message";

export const FormikField = (props) => {
    return (
            <TextField variant="standard"
                       label={props.label}
                       name={props.name}
                       type={props.type}
                       className="form-control"
                       onChange={props.obj}
                       helperText={<ErrorMsg name={props.name} />}
                       autoFocus
                       margin="dense"
                       fullWidth
            />
    )
}

// LOGIN
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
