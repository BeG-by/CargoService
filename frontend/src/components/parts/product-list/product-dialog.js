import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

export default (props) => {
  const {
    selectedProduct,
    onProductNameChange,
    onProductAmountChange,
    onProductPriceForOneChange,
    open,
    onSave,
    onClose,
    onDelete,
  } = props;

  const handleSubmit = () => {
    onSave();
  };

  const handleClose = () => {
    onClose();
  };

  const handleDelete = (product) => {
    onDelete(product);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="product-dialog-title">{"Product"}</DialogTitle>
      <TextField
        label="Name"
        id="name"
        defaultValue={selectedProduct.name}
        onChange={(e) => {
          onProductNameChange(e.target.value);
        }}
      />
      <TextField
        label="Amount"
        id="amount"
        defaultValue={selectedProduct.amount}
        onChange={(e) => {
          onProductAmountChange(e.target.value);
        }}
      />
      <TextField
        label="Price for one"
        id="priceForOne"
        defaultValue={selectedProduct.priceForOne}
        onChange={(e) => {
          onProductPriceForOneChange(e.target.value);
        }}
      />
      <Button onClick={handleSubmit}>Save product</Button>
      <Button onClick={handleClose}>Close</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </Dialog>
  );
};
