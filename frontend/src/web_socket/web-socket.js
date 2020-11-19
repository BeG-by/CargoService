import React, {useEffect, useState} from "react";
import useToast from "../components/parts/toast-notification/useToast";
import {connect} from "react-redux";
import * as Stomp from "stompjs"
import useActionToast from "./hooks/action-toast/use-action-toast";
import useNewInvoiceMessageHandler from "./hooks/handlers/use-new-invoice-message-handler";
import usePointPassMessageHandler from "./hooks/handlers/use-point-pass-message-handler";
import useNewWaybillMessageHandler from "./hooks/handlers/use-new-waybill-message-handler";
import useInvoiceUpdateMessageHandler from "./hooks/handlers/use-invoice-update-message-handler";
import useInvoiceStatusUpdateMessageHandler from "./hooks/handlers/use-invoice-status-update-message-handler";
import {
    INVOICE_STATUS_UPDATE_MESSAGE_TYPE,
    INVOICE_UPDATE_MESSAGE_TYPE,
    NEW_INVOICE_MESSAGE_TYPE,
    NEW_WAYBILL_MESSAGE_TYPE,
    POINT_PASS_MESSAGE_TYPE
} from "./notification-types";
import {WEB_SOCKET_CONNECT_URL} from "../components/parts/util/request-util";

const mapStateToProps = (store) => {
    return {
        userId: store.user.id,
        role: store.user.roles[0]
    }
};

const UNKNOWN_ROLE = 'UNKNOWN';

export const WebSocket = connect(mapStateToProps)((props) => {
    const [currentStompClient, setCurrentStompClient] = useState(null);
    const [NotificationToastComponent, openNotificationToast] = useToast();
    const [ActionToastComponent, openActionToast] = useActionToast()

    const [NewWaybillHandlerComponent, handleNewWaybillMessage] = useNewWaybillMessageHandler();
    const [NewInvoiceHandlerComponent, handleNewInvoiceMessage] = useNewInvoiceMessageHandler();
    const [PointPassHandlerComponent, handlePointPassMessage] = usePointPassMessageHandler()
    const [InvoiceUpdateHandlerComponent, handleInvoiceUpdateMessage] = useInvoiceUpdateMessageHandler()
    const [InvoiceStatusUpdateHandlerComponent, handleInvoiceStatusUpdateMessage] = useInvoiceStatusUpdateMessageHandler();

    const subscribeToPrivateUrl = (stompClient) => {
        const privateUrl = `/user/${props.userId}/queue/messages`
        stompClient.subscribe(privateUrl, onMessageReceive)
    }

    const onSocketConnect = (stompClient) => {
        setCurrentStompClient(stompClient);
        subscribeToPrivateUrl(stompClient);
    }

    const onSocketError = () => {
        setCurrentStompClient(null);
        openNotificationToast("Cannot connect to server for real-time notifications", "warning");
    }

    const connectToServer = () => {
        let SockJs = require("sockjs-client");
        // SockJs = new SockJs(WEB_SOCKET_CONNECT_URL);
        SockJs = new SockJs("http://localhost:8080/ws");
        return Stomp.over(SockJs);
    }


    const onMessageReceive = (msg) => {
        const messageData = JSON.parse(msg.body);
        switch (messageData.notificationType) {
            case NEW_INVOICE_MESSAGE_TYPE:
                handleNewInvoiceMessage(messageData, openActionToast);
                break;
            case NEW_WAYBILL_MESSAGE_TYPE:
                handleNewWaybillMessage(messageData, openActionToast);
                break;
            case INVOICE_STATUS_UPDATE_MESSAGE_TYPE:
                handleInvoiceStatusUpdateMessage(messageData, openActionToast, openNotificationToast)
                break;
            case INVOICE_UPDATE_MESSAGE_TYPE:
                handleInvoiceUpdateMessage(messageData, openActionToast);
                break;
            case POINT_PASS_MESSAGE_TYPE:
                handlePointPassMessage(messageData, openActionToast);
                break;
        }
    }

    useEffect(() => {
        if (props.role !== UNKNOWN_ROLE) {
            let stompClient = connectToServer();
            stompClient.connect({}, () => onSocketConnect(stompClient), () => onSocketError());
        }
    }, [props.role])


    return (
        <div style={{zIndex: 999}}>
            {ActionToastComponent}
            {NotificationToastComponent}

            {NewInvoiceHandlerComponent}
            {PointPassHandlerComponent}
            {InvoiceUpdateHandlerComponent}
            {NewWaybillHandlerComponent}
            {InvoiceStatusUpdateHandlerComponent}
        </div>
    )
})