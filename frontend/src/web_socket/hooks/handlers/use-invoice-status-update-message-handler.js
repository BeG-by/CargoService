import React from "react";
import {INVOICE_NOTIFICATION_DATA_URL, makeRequest} from "../../../components/parts/util/request-util";
import useInvoiceConfirmationForm from "../forms/use-invoice-confirmation-form";
import useInvoiceEditForm from "../forms/use-invoice-edit-form";

export default function useInvoiceStatusUpdateMessageHandler() {
    const [InvoiceConfirmationDialogComponent, openInvoiceConfirmationDialogComponent] = useInvoiceConfirmationForm();
    const [InvoiceEditDialogComponent, openEditInvoiceDialog] = useInvoiceEditForm();

    const loadInvoiceNotificationData = (invoiceId) => {
        return makeRequest("GET", INVOICE_NOTIFICATION_DATA_URL + "/" + invoiceId);
    }

    const convertToStringAndFormat = (invoiceNotificationData) => {
        const data = invoiceNotificationData;
        return [
            "Number: ", <strong>{data.number}</strong>,
            <br/>,
            "Driver: ", <strong>{data.driver.name} {data.driver.surname}</strong>,
            <br/>,
            "Registered by: ", <strong>{data.registrationUser.name} {data.registrationUser.surname}</strong>,
            <br/>,
            "New status: ", <strong>{data.status}</strong>,
        ]
    }

    const openNecessaryDialog = (messageData, formatData, openActionToastCallback, showNotificationToastCallback) => {
        let title = "";
        switch (messageData.newStatus) {
            case "REJECTED":
                title = `Invoice was rejected`;
                openActionToastCallback(title,
                    formatData,
                    () => openEditInvoiceDialog(messageData.invoiceId, showNotificationToastCallback))
                break;
            case "ACCEPTED":
                title = `Invoice was accepted`
                openActionToastCallback(
                    title,
                    formatData,
                    () => openInvoiceConfirmationDialogComponent(messageData.invoiceId));
                break;
            default:
                title = `Invoice status updated`
                openActionToastCallback(
                    title,
                    formatData,
                    () => openInvoiceConfirmationDialogComponent(messageData.invoiceId));
                break;
        }
    }

    const handleNewInvoiceMessage = async (messageData, openActionToastCallback, showNotificationToastCallback) => {
        let response = await loadInvoiceNotificationData(messageData.invoiceId);
        let formatData = convertToStringAndFormat(response.data);
        openNecessaryDialog(messageData, formatData, openActionToastCallback, showNotificationToastCallback);
    }

    const ComboComponent = (
        <div>
            {InvoiceConfirmationDialogComponent}
            {InvoiceEditDialogComponent}
        </div>
    )

    return [ComboComponent, handleNewInvoiceMessage]
}