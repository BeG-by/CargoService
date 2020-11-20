import React from "react";
import {DrawerItem} from "./drawer-item";
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded';

const path = "/calendar";

export const ItemCalendar = () => {
    const icon = <EventAvailableRoundedIcon color='primary'/>;
    return <DrawerItem text='Calendar' icon={icon} path={path}/>
}