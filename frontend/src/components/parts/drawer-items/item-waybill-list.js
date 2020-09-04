import React from "react";
import {DrawerItem} from "./drawer-item";
import AssignmentIcon from "@material-ui/icons/Assignment";

const handleClick = () => {
    window.location.href = '/waybill'; //fixme отрисовка таблицы путевых заметок
}

export const ItemWaybillList = () => {
    const icon = <AssignmentIcon color='primary'/>;
    return (
        <DrawerItem text='Waybills' icon={icon} handleClick={handleClick}/>
    )
}