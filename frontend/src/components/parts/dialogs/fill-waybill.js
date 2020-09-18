import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelButton} from "../buttons/cancel-button";

const handleInvoiceShow = () => {
    window.location.href = '/invoice';
}

export const FillWaybillDialog = (action) => {
    return (
        <div className="form-signin">
            <i style={{fontSize: 16}}>Do you want to fill in the waybill
            <br/>
            for this invoice?</i>
            <div className='btn-row'>
                <OkButton content='Yes' handleClick={action}/>
                <CancelButton content='No' handleClick={handleInvoiceShow}/>
            </div>
    </div>);
}
