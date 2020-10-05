import {withRouter} from "react-router-dom";
import React from "react";
import {OkButton} from "../buttons/ok-button";
import {CancelButton} from "../buttons/cancel-button";

export const EditInvoice = withRouter((props) => {
    const handleEdit =  () => {
        //todo some edit logic
    }

    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>Do you want to edit the invoice?</i>
                <div className='btn-row'>
                    <OkButton content='OK' handleClick={handleEdit}/>
                    <CancelButton content='Cancel' handleClick={props.handleClose}/>
                </div>
            </div>
        </div>);
})