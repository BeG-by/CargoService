import React from "react";

const TOAST_TITLE = "PDF ready"

export default function useInvoiceUpdateMessageHandler() {
    const handleInvoiceUpdateMessage = async (messageData, openActionToast) => {
        let presignedURI = messageData.presignedURI;
        openActionToast(TOAST_TITLE, "", () => window.open(presignedURI))
    }

    return [handleInvoiceUpdateMessage]
}