import React from "react";
import {DrawerItem} from "./drawer-item";
import EmailIcon from "@material-ui/icons/Email";
import {Link} from "react-router-dom";

export const ItemSendMail = () => {
    const icon = <EmailIcon color='primary'/>;
    return (
        <Link className="link-item-black" to='/sendMail' style={{textDecoration: "none"}}>
            <DrawerItem text='Send message' icon={icon}/>
        </Link>
    )
}