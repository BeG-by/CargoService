import React from "react";
import {DrawerItem} from "./drawer-item";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";

const path = "/contacts";

export const ItemContacts = () => {
    const icon = <LocalPhoneIcon color='primary'/>;
    return (
        <DrawerItem text='Contacts' icon={icon} path={path}/>
    )
}