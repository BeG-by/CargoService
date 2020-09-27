import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import WaybillForm from "../../forms/waybill-form/waybill-form";
import {DialogTitleCustomized} from "../../parts/dialogs/dialog-title-customized";

export default function WaybillDialog(props) {
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
                    {"Waybill to invoice # "}{props.invoice.number}
                </DialogTitleCustomized>
                <DialogContent>
                    <WaybillForm invoice={props.invoice} onClose={props.onClose}/>
                </DialogContent>
            </Dialog>
        </div>
    );
}