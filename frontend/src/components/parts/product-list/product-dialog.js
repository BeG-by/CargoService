import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

export default (props) => {
  const { productData, open, onSubmit, onClose } = props;

  const [product, setProduct] = useState({ productData });

  const handleSubmit = () => {
    onSubmit(product);
  };

  const handleClose = () => {
    onClose();
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
        onChange={(e) => {
          setProduct({
            name: e.target.value,
            amount: product.amount,
            priceForOne: product.priceForOne,
          });
        }}
      />

      <TextField
        label="Amount"
        id="amount"
        onChange={(e) => {
          setProduct({
            name: product.name,
            amount: e.target.value,
            priceForOne: product.priceForOne,
          });
        }}
      />

      <TextField
        label="Price for one"
        id="priceForOne"
        onChange={(e) => {
          setProduct({
            name: product.name,
            amount: product.amount,
            priceForOne: e.target.value,
          });
        }}
      />

      <Button onClick={handleSubmit}>Save product</Button>
    </Dialog>
  );
};
