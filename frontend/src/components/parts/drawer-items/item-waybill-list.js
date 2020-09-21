import React from "react";
import {DrawerItem} from "./drawer-item";
import AssignmentIcon from "@material-ui/icons/Assignment";

const path = "/waybill";

export const ItemWaybillList = () => {
    const icon = <AssignmentIcon color='primary'/>;
    return (
        <DrawerItem text='Waybills' icon={icon} path={path}/>
    )
}