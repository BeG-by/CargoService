import React from "react";
import {Component} from "react";
import ReturnButton from "../../parts/buttons/return-button";
import '../../App.css';

export default class NotFound extends Component {
    render() {
        return (
            <div className="main-body-field">
                <h2>Page not found.</h2>
                <ReturnButton buttonText="Return to Main Page" returnHandler="NotFound"/>
            </div>
        );
    }
}