import React, {useState} from "react";
import InvoiceDialog from "../../components/roles/dispatcher/invoice/invoice-dialog";
import {EMPTY_PRODUCT_OWNER} from "../../components/roles/dispatcher/invoice/invoice-form";

export default () => {
    const [open, setOpen] = useState(false);
    const [invoiceId, setInvoiceId] = useState(-1);
    const [showNotificationToastCallback, setShowNotificationToastCallback] = useState(null);

    const handleDialogClose = () => {
        setOpen(false);
    }

    const openInvoiceDialog = (invoiceId, showNotificationToastCallback) => {
        setInvoiceId(invoiceId);
        setOpen(true)
        setShowNotificationToastCallback(() => (message, severity) => showNotificationToastCallback(message, severity));
    }

    const handleShowNotificationToastCall = (message, severity = "success") => {
        if (showNotificationToastCallback !== null && showNotificationToastCallback !== undefined) {
            showNotificationToastCallback(message, severity);
        }
    }

    const InvoiceDialogWithForm = (
        <InvoiceDialog
            open={open}
            onClose={handleDialogClose}
            productOwner={EMPTY_PRODUCT_OWNER}
            invoiceId={invoiceId}
            openToast={handleShowNotificationToastCall}
        />
    )

    return [InvoiceDialogWithForm, openInvoiceDialog];
}