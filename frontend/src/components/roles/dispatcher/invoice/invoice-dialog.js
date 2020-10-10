import React from "react";
import {Dialog} from "@material-ui/core";
import InvoiceForm from "./invoice-form";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function InvoiceDialog(props) {
    const {open, onClose, productOwner, invoiceId , openToast} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog maxWidth={"lg"} open={open} onClose={handleClose} className="invoice-dialog">
            <DialogTitle id="form-dialog-title">
                <span id="form-title">Invoice</span>
                <IconButton aria-label="close"
                            onClick={handleClose}
                            className="close-user-dialog-btn"
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <InvoiceForm
                productOwner={productOwner}
                invoiceId={invoiceId}
                onClose={handleClose}
                openToast={openToast}
            />
        </Dialog>
    );
};
