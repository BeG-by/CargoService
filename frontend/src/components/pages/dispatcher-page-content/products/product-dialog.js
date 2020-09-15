import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ProductForm from "./product-form";

export default (props) => {
  const { open, onClose, initProductState, onSubmit } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Product</DialogTitle>
      <DialogContent>
        <ProductForm
          initProductState={initProductState}
          onSubmit={onSubmit}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};
