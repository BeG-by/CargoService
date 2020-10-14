import React from "react";
import {
    makeRequest,
    POINT_NOTIFICATION_DATA_URL
} from "../../../components/parts/util/request-util";
import useWaybillInfoForm from "../forms/use-waybill-info-form";
import {dateToString, formatDateStr} from "../../utils";

export default function usePointPassHandler() {
    const [WaybillDialogComponent, openWaybillDialog] = useWaybillInfoForm();

    const loadPointNotificationData = (pointId) => {
        return makeRequest("GET", POINT_NOTIFICATION_DATA_URL + "/" + pointId);
    }

    const convertToStringAndFormat = (pointNotificationData) => {
        const data = pointNotificationData;
        return [
            "Driver: ", <strong>{data.driver.name} {data.driver.surname}</strong>,
            <br/>,
            "Pass time: ", <strong>{formatDateStr(data.passTime)}</strong>,
        ]
    }

    const handlePointPass = async (messageData, openActionToast) => {
        let response = await loadPointNotificationData(messageData.pointId);
        let formatData = convertToStringAndFormat(response.data);
        let title = "Point pass";
        openActionToast(title, formatData, () => openWaybillDialog(messageData.waybillId))
    }

    return [WaybillDialogComponent, handlePointPass]
}