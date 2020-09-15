import React from "react";
import PageTemplate from "../index";
import NotAuthorized from "../error-page/error-401";
import {Route} from "react-router-dom";

export default function InvoicePage() {
    if (localStorage.getItem('authorization') != null
        && localStorage.getItem('authorization').trim()) {
    return (
        <PageTemplate page="invoice"/>
    );
    } else {
        return <Route component={NotAuthorized}/>;
    }
}
