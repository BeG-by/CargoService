import React from "react";
import {ReturnButton} from "../../parts/buttons/return-button";
import '../../App.css';

export const UserNotExist = () => {
    return (
        <main>
            <div className="main-body-field">
                <h2>User doesn't exist in the system.</h2>
                <ReturnButton buttonText="Go to Welcome Page" returnHandler="NotAuthorized"/>
            </div>
        </main>
    );
}