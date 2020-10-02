import React from "react";
import {DrawerItem} from "./drawer-item";
import BusinessIcon from '@material-ui/icons/Business'

const path = "/owners";

export const ItemClientTable = () => {
    const icon = <BusinessIcon color='primary'/>;
    return <DrawerItem text='Clients' icon={icon} path={path}/>
}