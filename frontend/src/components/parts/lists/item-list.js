import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { ListItem } from "material-ui/List";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ItemList(props) {
  const items = props.items;
  const listName = props.listName;
  const onRowClick = props.onRowClick;

  const handleRowClick = (item) => {
    onRowClick(item);
  };

  const classes = useStyles();

  return (
    <List className={classes.root}>
      <h3>{listName}</h3>
      {items.map((item, key) => {
        return (
          <ListItem
            primaryText={item.name}
            key={key}
            onClick={() => handleRowClick(item)}
          />
        );
      })}
    </List>
  );
}
