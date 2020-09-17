import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {NavLink} from "react-router-dom";

export const DrawerItem = (props) => {
    return (
        <NavLink to={props.path}>
            <ListItem button key={props.text}>
                <ListItemIcon>{props.icon}</ListItemIcon>
                <ListItemText primary={props.text}/>
            </ListItem>
        </NavLink>
    )
}