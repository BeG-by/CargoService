import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelButton} from "../buttons/cancel-button";
import {updateInvoiceStatus} from "../../roles/manager/request-utils";
import {withRouter} from "react-router-dom";

export const AssignVerificationInvoice = withRouter((props) => {
    let inv = props.invoice;
    const [invoice] = React.useState({id: inv.id, status: "ACCEPTED"});

    const handleVerify = async () => {
        await updateInvoiceStatus(invoice);
        props.history.push("/success");
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
})

export const RejectVerificationInvoice = withRouter((props) => {
    let inv = props.invoice;
    const [invoice] = React.useState({id: inv.id, status: "REJECTED"});

    const handleReject = async () => {
        await updateInvoiceStatus(invoice);
        props.history.push("/success");
    }

    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>Reject the incorrect invoice?</i>
                <div className='btn-row'>
                    <OkButton content='OK' handleClick={handleReject}/>
                    <CancelButton content='Cancel' handleClick={props.handleClose}/>
                </div>
            </div>
        </div>);
})


