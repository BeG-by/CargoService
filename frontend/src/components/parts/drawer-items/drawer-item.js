import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

export const DrawerItem = (props) => {
    return (
        <ListItem button key={props.text} onClick={props.handleClick}>
            <ListItemIcon>{props.icon}</ListItemIcon>
            <ListItemText primary={props.text}/>
        </ListItem>
    )
}