import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem } from "material-ui/List";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflow: "auto",
    maxWidth: 400,
    maxHeight: 465,
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
            key={key}
            alignItems="flex-start"
            onClick={() => handleRowClick(item)}
          >
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {item.primaryText}
                  </Typography>
                  {"" + item.secondaryText}
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
