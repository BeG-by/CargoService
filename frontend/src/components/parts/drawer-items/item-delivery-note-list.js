import React from "react";
import {DrawerItem} from "./drawer-item";
import AssignmentIcon from "@material-ui/icons/Assignment";

const handleClick = () => {
    window.location.href = '/deliveryNote'; //fixme отрисовка таблицы ттнок
}

export const ItemDeliveryNoteList = () => {
    const icon = <AssignmentIcon color='primary'/>;
    return (
        <DrawerItem text='Delivery Notes' icon={icon} handleClick={handleClick}/>
    )
}