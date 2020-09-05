import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelButton} from "../buttons/cancel-button";

const handleVerify = () => {
    alert('verified!'); //todo запрос на изменение статуса
}

export const AssignVerificationInvoice = (props) => {
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