import React from "react";
import {DrawerItem} from "./drawer-item";
import AssignmentIcon from "@material-ui/icons/Assignment";

const path = "/mainPage";

export const ItemInvoiceList = () => {
    const icon = <AssignmentIcon color='primary'/>;
    return (
        <DrawerItem text='Invoices' icon={icon} path={path}/>
    )
}