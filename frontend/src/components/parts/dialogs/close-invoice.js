import {withRouter} from "react-router-dom";
import React from "react";
import {updateInvoiceStatus} from "../../roles/manager/request-utils";
import {OkButton} from "../buttons/ok-button";
import {CancelButton} from "../buttons/cancel-button";

export const CloseInvoice = withRouter((props) => {
    let inv = props.invoice;
    const [invoice] = React.useState({id: inv.id, status: "CLOSED"});

    const handleClose = async () => {
        await updateInvoiceStatus(invoice);
        props.history.push("/success");
    }

    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>Close the invoice?</i>
                <div className='btn-row'>
                    <OkButton content='OK' handleClick={handleClose}/>
                    <CancelButton content='Cancel' handleClick={props.handleClose}/>
                </div>
            </div>
        </div>);
})