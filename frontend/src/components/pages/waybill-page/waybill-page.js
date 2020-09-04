import React from "react";
import PageTemplate from "../index";


export default function WaybillPage() {
    // if (localStorage.getItem('authorization') != null //fixme подключить авторизацию, когда заработает бэк
    //     && localStorage.getItem('authorization').trim()) {
    return (
        <PageTemplate page="waybill"/>
    );
    // } else {
    //     return <Route component={NotAuthorized}/>;
    // }
}
