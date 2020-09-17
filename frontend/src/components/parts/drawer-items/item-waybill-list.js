import React from "react";
import {DrawerItem} from "./drawer-item";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from 'react-router-dom';

export const ItemWaybillList = () => {
    const icon = <AssignmentIcon color='primary'/>;
    return (
        <Link className="link-item-black" to='/waybill' style={{textDecoration: "none"}}>
            <DrawerItem text='Waybills' icon={icon}/>
        </Link>
    )
}