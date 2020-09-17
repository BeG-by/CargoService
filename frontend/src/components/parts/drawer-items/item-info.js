import React from "react";
import {DrawerItem} from "./drawer-item";
import InfoIcon from "@material-ui/icons/Info";
import {Link} from "react-router-dom";

export const ItemInfo = () => {
    const icon = <InfoIcon color='primary'/>;
    return (
        <Link className="link-item-black" to='/info' style={{textDecoration: "none"}}>
            <DrawerItem text='Info' icon={icon}/>
        </Link>
    )
}