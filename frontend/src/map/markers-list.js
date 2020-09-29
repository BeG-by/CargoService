import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {ListItem} from "material-ui/List";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 100,
        height: 500,
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ItemList(props) {
    const classes = useStyles();

    const handleRowClick = (item) => {
        props.onRowClick(item);
    };

    return (
        <List className={classes.root}>
            <div align={"center"}>
                <h3>{props.listName}</h3>
            </div>
            {props.items.map((item, key) => {
                return (
                    <ListItem
                        align={"center"}
                        primaryText={`${key + 1}`}
                        key={key}
                        onClick={() => handleRowClick(item)}
                    />
                );
            })}
        </List>
    );
}
