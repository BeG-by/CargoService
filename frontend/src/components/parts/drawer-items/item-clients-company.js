import React from "react";
import {DrawerItem} from "./drawer-item";
import BusinessIcon from '@material-ui/icons/Business'

const path = "/mainPage";

export const ItemClientTable = () => {
    const icon = <BusinessIcon color='primary'/>;
    return (
        <DrawerItem text='Client table' icon={icon} path={path}/>
    )
}