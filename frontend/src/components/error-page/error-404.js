import React from "react";
import {Component} from "react";
import {ReturnButton} from "../parts/return-button";

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>Page not found.</h2>
                <ReturnButton buttonText="Go to Start Page" returnHandler="NotFound"/>
            </div>
        );
    }
}