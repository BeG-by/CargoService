import React from "react";
import TextField from "@material-ui/core/TextField";
import '../forms/forms.css';
import {ErrorMsg} from "./error-message";

export const FormikField = (props) => {
    return (
        <div className="FormikField">
            <TextField variant="standard"
                       label={props.label}
                       name={props.name}
                       type={props.type}
                       className="form-control"
                       onChange={props.obj}
                       helperText={<ErrorMsg name={props.name} />}
                       style={{minWidth: 250}}
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
    label: 'Type',
    type: 'text'
}

export const CompanyPanField = {
    name: 'companyPan',
    label: 'PAN',
    type: 'text'
}

export const CompanyNameField = {
    name: 'companyName',
    label: 'Name',
    type: 'text'
}

export const CompanyCountryField = {
    name: 'companyCountry',
    label: 'Country',
    type: 'text'
}

export const CompanyCityField = {
    name: 'companyCity',
    label: 'City',
    type: 'text'
}

export const CompanyStreetField = {
    name: 'companyStreet',
    label: 'Street',
    type: 'text'
}

export const CompanyHouseField = {
    name: 'companyHouse',
    label: 'House',
    type: 'text'
}

export const CompanyEmailField = {
    name: 'companyEmail',
    label: 'Email',
    type: 'text'
}

export const CompanyPhoneField = {
    name: 'companyPhone',
    label: 'Phone',
    type: 'text'
}

/////////////////////////////////////
// DELIVERY NOTE

export const DnNumberField = {
    name: 'dnNumber',
    label: 'Number',
    type: 'text'
}

////////////////////////////////////////
// WAYBILL

export const WbNumberField = {
    name: 'wbNumber',
    label: 'Number',
    type: 'text'
}

export const WbShipperField = {
    name: 'wbShipper',
    label: 'Shipper',
    type: 'text'
}

export const WbConsigneeField = {
    name: 'wbConsignee',
    label: 'Consignee',
    type: 'text'
}
