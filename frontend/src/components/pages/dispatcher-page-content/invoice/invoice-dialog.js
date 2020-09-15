import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import InvoiceForm from "./invoice-form";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles";

export default (props) => {
  const classes = useStyles();
  const { open, onClose, productOwner } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Invoice note registration
          </Typography>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={() => alert("Registered")}>Register</Button>
        </Toolbar>
      </AppBar>
      <InvoiceForm productOwner={productOwner} />
    </Dialog>
  );
};
