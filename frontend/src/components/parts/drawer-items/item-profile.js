import React from "react";
import {DrawerItem} from "./drawer-item";
import PersonIcon from "@material-ui/icons/Person";

const path = "/profile";

export const ItemProfile = () => {
    const icon = <PersonIcon color='primary'/>;
    return (
        <DrawerItem text='Profile' icon={icon} path={path}/>
    )
}