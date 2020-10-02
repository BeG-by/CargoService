import React from "react";
import {ReturnButton} from "../../parts/buttons/return-button";
import '../../App.css';

export const NotFound = () => {
    return (
        <div className="main-body-field">
            <h2>Page not found.</h2>
            <ReturnButton buttonText="Return to Main Page" returnHandler="NotFound"/>
        </div>
    );
}