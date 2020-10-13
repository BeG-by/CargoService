import {withRouter} from "react-router-dom";
import React from "react";
import {updateInvoiceStatus} from "../../roles/manager/request-utils";
import {OkButton} from "../buttons/ok-button";
import {CancelButton} from "../buttons/cancel-button";

export const CloseInvoice = withRouter((props) => {
    const inv = props.invoice;
    const invoice = inv.act === null || inv.act === undefined
                    ? {id: inv.id, status: "CLOSED", comment: "Clean delivery"}
                    : {id: inv.id, status: "CLOSED_WITH_ACT", comment: "Delivery with losses"};

    const handleOK = async () => {
        await updateInvoiceStatus(invoice);
        props.onCloseInvoice();
    }

    const handleClose = () => {
        props.onClose();
    }

    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>
                    You've already passed all control points!
                    <br/>
                    Do you want to close the invoice?</i>
                <div className='btn-row'>
                    <OkButton content='OK' handleClick={handleOK}/>
                    <CancelButton content='Cancel' handleClick={handleClose}/>
                </div>
            </div>
        </div>);
})