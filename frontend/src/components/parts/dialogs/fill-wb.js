import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelDnButton} from "../buttons/cancel-dn-button";

const handleFill = () => {
    window.location.href = '/waybill';
}

const handleDnShow = () => {
    window.location.href = '/deliveryNote';
}

export const assignFillingWB = () => {
    return (
        <div className="form-signin">
            <i>Do you want to fill in the waybill
            <br/>
            for this delivery note?</i>
            <div className='btn-row'>
                <OkButton handleClick={handleFill}/>
                <CancelDnButton handleClick={handleDnShow}/>
            </div>
    </div>);
}
