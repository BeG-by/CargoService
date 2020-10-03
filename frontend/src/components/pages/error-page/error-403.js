import React from "react";
import {ReturnButton} from "../../parts/buttons/return-button";
import '../../App.css';
import {withRouter} from "react-router-dom";

export const NoRights = withRouter((props) => {
    return (
        <main>
            <div className="main-body-field">
                <h2>You don't have necessary rights to access this page</h2>
                <ReturnButton history={props.history} buttonText="Go back" returnHandler="NoRights"/>
            </div>
        </main>
    );
})