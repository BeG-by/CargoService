import React from "react";
import {Component} from "react";
import ReturnButton from "../parts/return-button";

export default class NoRights extends Component {
    render() {
        return (
            <div>
                <h2>You don't have necessary rights to access this page</h2>
                <ReturnButton history={this.props.history} buttonText="Go back" returnHandler="NoRights"/>
            </div>
        );
    }
}