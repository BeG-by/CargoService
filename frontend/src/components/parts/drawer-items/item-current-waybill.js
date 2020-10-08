import React from "react";
import {DrawerItem} from "./drawer-item";
import AssignmentIcon from "@material-ui/icons/Assignment";

export const ItemCurrentWaybill = () => {
    const path = "/current";
    const icon = <AssignmentIcon color='primary'/>;

    return (
        <DrawerItem text='Current waybill' icon={icon} path={path}/>
    )
}