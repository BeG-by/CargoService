import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelButton} from "../buttons/cancel-button";

export const FillActDialog = (ok, cancel) => {
    return (
        <div className="form-signin">
            <i style={{fontSize: 16}}>Do you want to draw up an act
                <br/>
                of damage or loss of cargo?</i>
            <div className='btn-row'>
                <OkButton content='Yes' handleClick={ok}/>
                <CancelButton content='No' handleClick={cancel}/>
            </div>
        </div>);
}