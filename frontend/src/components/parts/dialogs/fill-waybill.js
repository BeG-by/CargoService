import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelButton} from "../buttons/cancel-button";

export const FillWaybillDialog = (ok, cancel) => {
    return (
        <div className="form-signin">
            <i style={{fontSize: 16}}>Do you want to fill in the waybill
            <br/>
            for this invoice?</i>
            <div className='btn-row'>
                <OkButton content='Fill in' handleClick={ok}/>
                <CancelButton content='Show invoice' handleClick={cancel}/>
            </div>
    </div>);
}
