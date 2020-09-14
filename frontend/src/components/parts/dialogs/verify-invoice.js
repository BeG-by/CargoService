import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelButton} from "../buttons/cancel-button";
import {updateInvoiceStatus} from "../invoices-table-and-form/request-utils";

const handleVerify = (invoice) => {
    invoice.status = "ACCEPTED";
    updateInvoiceStatus(invoice);
    window.location.href = "/mainPage";
}

const handleReject = (invoice) => {
    invoice.status = "REJECTED";
    updateInvoiceStatus(invoice);
    window.location.href = "/mainPage";
}

export const AssignVerificationInvoice = (props) => {
    let invoice = props.invoice;
    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>Assign the status as "verified"?</i>
                <div className='btn-row'>
                    <OkButton content='OK' handleClick={handleVerify(invoice)}/>
                    <CancelButton content='Cancel' handleClick={props.handleClose}/>
                </div>
            </div>
        </div>);
}

export const RejectVerificationInvoice = (props) => {
    let invoice = props.invoice;
    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>Reject the invoice?</i>
                <div className='btn-row'>
                    <OkButton content='OK' handleClick={handleReject(invoice)}/>
                    <CancelButton content='Cancel' handleClick={props.handleClose}/>
                </div>
            </div>
        </div>);
}