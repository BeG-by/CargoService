import React, {useState} from "react";
import {DialogWindow} from "../../../components/parts/dialogs/dialog";
import {InvoiceInfo} from "../../../components/roles/manager/invoice-info";
import {WaybillInfo} from "../../../components/roles/driver/waybill-info";

export default () => {
    const [open, setOpen] = useState(false);
    const [waybillId, setWaybillId] = useState(-1)

    const handleDialogClose = () => {
        setOpen(false);
    }

    const openWaybillInfoDialog = (waybillId) => {
        setWaybillId(waybillId);
        setOpen(true)
    }

    const WaybillInfoDialogWithForm = (
        <DialogWindow
            dialogTitle={"Waybill"}
            fullWidth={true}
            maxWidth="xl"
            handleClose={handleDialogClose}
            openDialog={open}
            form={<WaybillInfo waybillId={waybillId} onClose={handleDialogClose}/>}
        />
    )

    return [WaybillInfoDialogWithForm, openWaybillInfoDialog];
}