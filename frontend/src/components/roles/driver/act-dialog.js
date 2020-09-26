import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {DialogTitleCustomized} from "../../parts/dialogs/dialog-title-customized";
import {ActForm} from "../../forms/act-form/act-form";

export default function ActDialog(props) {
    return (
        <div>
            <Dialog
                fullWidth="true"
                maxWidth="md"
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitleCustomized
                    onClose={props.onClose}>
                    {"Act to invoice # "} {props.waybill.invoice.number}
                </DialogTitleCustomized>
                <DialogContent>
                    <ActForm invoice={props.waybill.invoice} onClose={props.onClose}/>
                </DialogContent>
            </Dialog>
        </div>
    );
}