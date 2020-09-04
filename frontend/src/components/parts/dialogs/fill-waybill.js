import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelButton} from "../buttons/cancel-button";

const handleFill = () => {
    window.location.href = '/waybill';
}

const handleInvoiceShow = () => {
    window.location.href = '/invoice';
}

export const assignFillingWaybill = () => {
    return (
        <div className="form-signin">
            <i style={{fontSize: 16}}>Do you want to fill in the waybill
            <br/>
            for this delivery note?</i>
            <div className='btn-row'>
                <OkButton content='Yes' handleClick={handleFill}/>
                <CancelButton content='No' handleClick={handleInvoiceShow}/>
            </div>
    </div>);
}
