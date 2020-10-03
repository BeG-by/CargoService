import React from "react";
import {DrawerItem} from "./drawer-item";
import BusinessIcon from '@material-ui/icons/Business'

const path = "/clients";

export const ItemClientTable = () => {
    const icon = <BusinessIcon color='primary'/>;
    return <DrawerItem text='Clients' icon={icon} path={path}/>
}