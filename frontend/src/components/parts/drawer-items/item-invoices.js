import React from "react";
import {DrawerItem} from "./drawer-item";
import AssignmentIcon from "@material-ui/icons/Assignment";

const path = "/invoices"

export default function ItemInvoices(props) {
    const icon = <AssignmentIcon color='primary'/>;
    return <DrawerItem icon={icon} path={path} text={"Invoices"}/>
}