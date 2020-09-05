import React from "react";
import {DrawerItem} from "./drawer-item";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";

const handleClick = () => {
    window.location.href = '/contacts';
}

export const ItemContacts = () => {
    const icon = <LocalPhoneIcon color='primary'/>;
    return (
        <DrawerItem text='Contacts' icon={icon} handleClick={handleClick}/>
    )
}