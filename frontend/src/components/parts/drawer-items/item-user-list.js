import React from "react";
import {DrawerItem} from "./drawer-item";
import PeopleIcon from '@material-ui/icons/People';

const path = "/users";

export const ItemUserTable = () => {
    const icon = <PeopleIcon color='primary'/>;
    return (
        <DrawerItem text='Users' icon={icon} path={path}/>
    )
}