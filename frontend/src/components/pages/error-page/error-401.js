import React from "react";
import {ReturnButton} from "../../parts/buttons/return-button";

export const NotAuthorized = () => {
    return (
        <main>
            <div className="main-body-field">
                <h2>You are not authorized.</h2>
                <ReturnButton buttonText="Go to Welcome Page" returnHandler="NotAuthorized"/>
            </div>
        </main>
    )
}
