import React from "react";
import {DrawerItem} from "./drawer-item";
import TableChartIcon from '@material-ui/icons/TableChart';

export const ItemReports = () => {
    const icon = <TableChartIcon color='primary'/>;
    const path = "/reports";

    return (
        <DrawerItem text='Reports' icon={icon} path={path}/>
    )
}