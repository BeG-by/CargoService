import React from "react";
import {DrawerItem} from "./drawer-item";
import InfoIcon from "@material-ui/icons/Info";

const path = "/info";

export const ItemInfo = () => {
    const icon = <InfoIcon color='primary'/>;
    return (
        <DrawerItem text='Info' icon={icon} path={path}/>
    )
}