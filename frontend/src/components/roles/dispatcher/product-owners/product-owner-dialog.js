import React from "react";
import {Dialog} from "@material-ui/core";
import ProductOwnerForm from "./product-owner-form";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

export default function ProductOwnerDialog(props) {
    const {open, onClose, productOwnerId} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="form-dialog-title">
                <span id="form-title">Client</span>
                <IconButton aria-label="close"
                            onClick={handleClose}
                            className="close-user-dialog-btn"
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ProductOwnerForm
                    productOwnerId={productOwnerId}
                    onClose={handleClose}
                />
            </DialogContent>
        </Dialog>
    );
};
