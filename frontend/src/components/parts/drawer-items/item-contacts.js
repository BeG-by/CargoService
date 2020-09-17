import React from "react";
import {DrawerItem} from "./drawer-item";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import {Link} from "react-router-dom";

export const ItemContacts = () => {
    const icon = <LocalPhoneIcon color='primary'/>;
    return (
        <Link className="link-item-black" to='/contacts' style={{textDecoration: "none"}}>
            <DrawerItem text='Contacts' icon={icon} />
        </Link>
    )
}