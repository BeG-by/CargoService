import React from "react";
import {DrawerItem} from "./drawer-item";
import AssignmentIcon from "@material-ui/icons/Assignment";

const handleClick = () => {
    window.location.href = '/mainPage';
}

export const ItemInvoiceList = () => {
    const icon = <AssignmentIcon color='primary'/>;
    return (
        <DrawerItem text='Invoices' icon={icon} handleClick={handleClick}/>
    )
}