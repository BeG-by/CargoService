import React from "react";
import ReturnButton from "../../parts/buttons/return-button";
import '../../App.css';

export const NoRights = () => {
    return (
        <div className="main-body-field">
            <h2>You don't have necessary rights to access this page</h2>
            <ReturnButton history={this.props.history} buttonText="Go back" returnHandler="NoRights"/>
        </div>
    );
}