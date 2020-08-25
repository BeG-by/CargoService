import React from "react";
import {Component} from "react";
import ReturnButton from "../../parts/buttons/return-button";

export default class NotAuthorized extends Component {
    render() {
        return (
            <div>
                <h2>You are not authorized.</h2>
                <ReturnButton buttonText="Go to Login Page" returnHandler="NotAuthorized"/>
            </div>
        )
    }
}