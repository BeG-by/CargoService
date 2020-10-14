import React, {useState} from "react";
import {DialogWindow} from "../../../components/parts/dialogs/dialog";
import {InvoiceInfo} from "../../../components/roles/manager/invoice-info";

export default () => {
    const [open, setOpen] = useState(false);
    const [invoiceId, setInvoiceId] = useState(-1)

    const handleDialogClose = () => {
        setOpen(false);
    }

    const openInvoiceDialog = (invoiceId) => {
        setInvoiceId(invoiceId);
        setOpen(true)
    }

    const InvoiceDialogWithForm = (
        <DialogWindow
            dialogTitle={"Invoice"}
            fullWidth={true}
            maxWidth="xl"
            handleClose={handleDialogClose}
            openDialog={open}
            form={<InvoiceInfo invoiceId={invoiceId} onClose={handleDialogClose}/>}
        />
    )

    return [InvoiceDialogWithForm, openInvoiceDialog];
}