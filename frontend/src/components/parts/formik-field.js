import React from "react";
import TextField from "@material-ui/core/TextField";
import '../forms/login-form/login-form.css';
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

////////////////////////////
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

//////////////////////////////
// REGISTRATION
export const CompanyTypeField = {
    name: 'companyType',
    label: 'CompanyType',
    type: 'text'
}

export const CompanyPanField = {
    name: 'companyPan',
    label: 'CompanyPan',
    type: 'text'
}

export const CompanyNameField = {
    name: 'companyName',
    label: 'CompanyName',
    type: 'text'
}

export const CompanyCountryField = {
    name: 'companyCountry',
    label: 'CompanyCountry',
    type: 'text'
}

export const CompanyCityField = {
    name: 'companyCity',
    label: 'CompanyCity',
    type: 'text'
}

export const CompanyStreetField = {
    name: 'companyStreet',
    label: 'CompanyStreet',
    type: 'text'
}

export const CompanyHouseField = {
    name: 'companyHouse',
    label: 'CompanyHouse',
    type: 'text'
}

export const CompanyFlatField = {
    name: 'companyFlat',
    label: 'CompanyFlat',
    type: 'text'
}

export const CompanyEmailField = {
    name: 'companyEmail',
    label: 'CompanyEmail',
    type: 'text'
}

/////////////////////////////////////
// TTN

export const TtnNumberField = {
    name: 'ttnNumber',
    label: 'TtnNumber',
    type: 'text'
}

