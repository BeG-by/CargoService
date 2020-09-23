import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelButton} from "../buttons/cancel-button";

export const CloseInvoiceDialog = (ok, cancel) => {
    return (
        <div className="form-signin">
            <i style={{fontSize: 16}}>Do you want to close invoice?</i>
            <div className='btn-row'>
                <OkButton content='Yes' handleClick={ok}/>
                <CancelButton content='No' handleClick={cancel}/>
            </div>
        </div>);
}