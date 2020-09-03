import React from "react";
import {DrawerItem} from "./drawer-item";
import EmailIcon from "@material-ui/icons/Email";

const handleClick = () => {
    window.location.href = '/sendMail';
}

export const ItemSendMail = () => {
    const icon = <EmailIcon color='primary'/>;
    return (
        <DrawerItem text='Send message' icon={icon} handleClick={handleClick}/>
    )
}