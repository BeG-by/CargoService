import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PointsForm from "./points-form";
import {DialogTitleCustomized} from "../../parts/dialogs/dialog-title-customized";

export default (props) => {
    const {open, onClose, initPointState, onSubmit, onDelete} = props;

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
                Control point
            </DialogTitleCustomized>
            <DialogContent>
                <PointsForm
                    initPointState={initPointState}
                    onSubmit={onSubmit}
                    onClose={handleClose}
                    onDelete={onDelete}
                />
            </DialogContent>
        </Dialog>
    );
};