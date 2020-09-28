import React from "react";
import {Dialog} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ProductForm from "./product-form";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function ProductDialog(props) {
    const {open, onClose, onSubmit, onDelete, initProductState} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog maxWidth={"lg"} open={open} onClose={handleClose}>
            <DialogTitle id="form-dialog-title">
                <span id="form-title">Product</span>
                <IconButton aria-label="close"
                            onClick={handleClose}
                            className="close-user-dialog-btn"
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ProductForm
                    initProductState={initProductState}
                    onDelete={onDelete}
                    onSubmit={onSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}
;
