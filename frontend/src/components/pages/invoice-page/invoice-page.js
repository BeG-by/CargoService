import React from "react";
import PageTemplate from "../index";

export default function InvoicePage() {
    // if (localStorage.getItem('authorization') != null //fixme подключить авторизацию, когда заработает бэк
    //     && localStorage.getItem('authorization').trim()) {
    return (
        <PageTemplate page="invoice"/>
    );
    // } else {
    //     return <Route component={NotAuthorized}/>;
    // }
}
