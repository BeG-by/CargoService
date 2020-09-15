import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import WaybillForm from "../../forms/waybill-form";


export default function WaybillDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{props.invoiceId}</DialogTitle>
                <DialogContent>
                    <WaybillForm/>
                </DialogContent>
            </Dialog>
        </div>
    );
}