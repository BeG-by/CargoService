import {OkButton} from "../buttons/ok-button";
import React from "react";

const handleVerify = () => {

}

export const assignVerificationDN = () => {
    return(
        <div>
            <i>Assign the status as "verified"?</i>
            <OkButton handleClick={handleVerify}/>
        </div>);
}