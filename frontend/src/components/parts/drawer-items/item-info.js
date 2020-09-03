import React from "react";
import {DrawerItem} from "./drawer-item";
import InfoIcon from "@material-ui/icons/Info";

const handleClick = () => {
    window.location.href = '/info';
}

export const ItemInfo = () => {
    const icon = <InfoIcon color='primary'/>;
    return (
        <DrawerItem text='Info' icon={icon} handleClick={handleClick}/>
    )
}