import React from "react";
import {DrawerItem} from "./drawer-item";
import HomeIcon from '@material-ui/icons/Home';

const path = "/storages";

export const ItemStorages = () => {
    const icon = <HomeIcon color='primary'/>;
    return (
        <DrawerItem text="Storages" icon={icon} path={path}/>
    )
}