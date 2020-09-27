import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import ProductsForm from "./products-form";
import {DialogTitleCustomized} from "../../parts/dialogs/dialog-title-customized";

export default function ProductsDialog(props) {
    const {open, onClose, onSubmit, initProductState} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth="true"
            maxWidth="sm"
        >
            <DialogTitleCustomized
                onClose={handleClose}>
                Lost product
            </DialogTitleCustomized>
            <DialogContent>
                <ProductsForm
                    initProductState={initProductState}
                    onSubmit={onSubmit}
                    onClose={handleClose}
                />
            </DialogContent>
        </Dialog>
    );
};