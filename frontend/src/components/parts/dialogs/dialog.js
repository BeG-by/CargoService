import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {DialogTitleCustomized} from "../dialog-title-customized";

export const DialogWindow = (props) => {
    return (
        <Dialog fullWidth={props.fullWidth}
                maxWidth={props.maxWidth}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
                open={props.openDialog}>
            <DialogTitleCustomized style={{color:'#3f51b5', textAlign: "center"}}
                         id="customized-dialog-title"
                         onClose={props.handleClose}>
                {props.dialogTitle}
            </DialogTitleCustomized>
            <DialogContent>
            {props.form}
            </DialogContent>
        </Dialog>
    );
}