import React from "react";
import {DrawerItem} from "./drawer-item";
import EmailIcon from "@material-ui/icons/Email";

const path = "/sendEmail"

export const ItemSendMail = () => {
    const icon = <EmailIcon color='primary'/>;
    return (
        <DrawerItem text='Send message' icon={icon} path={path}/>
    )
}