import React from "react";
import {DrawerItem} from "./drawer-item";
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';

const path = "/autos";

export const ItemAutosTable = () => {
    const icon = <AirportShuttleIcon color='primary'/>;
    return <DrawerItem text='Autos' icon={icon} path={path}/>
}