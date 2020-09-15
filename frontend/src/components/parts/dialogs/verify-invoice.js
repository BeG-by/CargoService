import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelButton} from "../buttons/cancel-button";
import {updateInvoiceStatus} from "../invoices-table-and-form/request-utils";

export const AssignVerificationInvoice = (props) => {
    let i = props.invoice;
    const [invoice, setInvoice] = React.useState({id: i.id, status: "ACCEPTED"});

    const handleVerify = () => {
        alert(invoice.id + invoice.status);
        updateInvoiceStatus(invoice);
        window.location.href = "/mainPage";
    }

    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>Assign the status as "verified"?</i>
                <div className='btn-row'>
                    <OkButton content='OK' handleClick={handleVerify}/>
                    <CancelButton content='Cancel' handleClick={props.handleClose}/>
                </div>
            </div>
        </div>);
}

export const RejectVerificationInvoice = (props) => {
    let i = props.invoice;
    const [invoice, setInvoice] = React.useState({id: i.id, status: "REJECTED"});

    const handleReject = async () => {
        alert(invoice.id + invoice.status);
        await updateInvoiceStatus(invoice);
        window.location.href = "/mainPage";
    }

    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>Reject the invoice?</i>
                <div className='btn-row'>
                    <OkButton content='OK' handleClick={handleReject}/>
                    <CancelButton content='Cancel' handleClick={props.handleClose}/>
                </div>
            </div>
        </div>);
}