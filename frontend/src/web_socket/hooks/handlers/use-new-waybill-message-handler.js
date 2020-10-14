import React from "react";
import {
    makeRequest,
    WAYBILL_NOTIFICATION_DATA_URL
} from "../../../components/parts/util/request-util";
import useWaybillInfoForm from "../forms/use-waybill-info-form";

const TOAST_TITLE = "New waybill"

export default function useNewWaybillMessageHandler() {
    const [WaybillDialogComponent, openWaybillDialog] = useWaybillInfoForm();

    const loadWaybillNotificationData = (waybillId) => {
        return makeRequest("GET", WAYBILL_NOTIFICATION_DATA_URL + "/" + waybillId);
    }

    const convertToStringAndFormat = (waybillNotificationData) => {
        const data = waybillNotificationData;
        return [
            "Invoice Number: ", <strong>{data.invoiceNumber}</strong>,
            <br/>,
            "Registration user: ", <strong>{data.registrationUser.name} {data.registrationUser.surname}</strong>,
            <br/>,
        ]
    }

    const handleNewWaybillMessage = async (messageData, openActionToast) => {
        let response = await loadWaybillNotificationData(messageData.waybillId);
        let formatData = convertToStringAndFormat(response.data);
        openActionToast(TOAST_TITLE, formatData, () => openWaybillDialog(messageData.waybillId))
    }

    return [WaybillDialogComponent, handleNewWaybillMessage]
}