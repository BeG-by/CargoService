import {withRouter} from "react-router-dom";
import React from "react";
import {updateInvoiceStatus} from "../../roles/manager/request-utils";
import {OkButton} from "../buttons/ok-button";
import {CancelButton} from "../buttons/cancel-button";

export const EditInvoice = withRouter((props) => {
    let inv = props.invoice;

    const handleEdit = () => {
        //fixme do smth
    }

    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>Close the invoice?</i>
                <div className='btn-row'>
                    <OkButton content='OK' handleClick={handleEdit}/>
                    <CancelButton content='Cancel' handleClick={props.handleClose}/>
                </div>
            </div>
        </div>);
})