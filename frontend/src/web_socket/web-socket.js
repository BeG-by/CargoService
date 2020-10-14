import React, {useEffect, useState} from "react";
import useToast from "../components/parts/toast-notification/useToast";
import {connect} from "react-redux";
import * as Stomp from "stompjs"
import useInvoiceConfirmationForm from "./hooks/forms/use-invoice-confirmation-form";
import useActionToast from "./hooks/action-toast/use-action-toast";
import useWaybillInfoForm from "./hooks/forms/use-waybill-info-form";
import useInvoiceEditForm from "./hooks/forms/use-invoice-edit-form";
import useNewInvoiceHandler from "./hooks/handlers/use-new-invoice-handler";
import usePointPassHandler from "./hooks/handlers/use-point-pass-handler";
import useNewWaybillHandler from "./hooks/handlers/use-new-waybill-handler";
import useInvoiceUpdateHandler from "./hooks/handlers/use-invoice-update-handler";
import useInvoiceStatusUpdateHandler from "./hooks/handlers/use-invoice-status-update-handler";

const mapStateToProps = (store) => {
    return {
        userId: store.user.id,
        role: store.user.roles[0]
    }
};

export const WebSocket = connect(mapStateToProps)((props) => {
    const [currentStompClient, setCurrentStompClient] = useState(null);
    const [ToastComponent, showToast] = useToast();
    const [ActionToastComponent, openActionToast] = useActionToast()

    const [NewWaybillHandlerComponent, handleNewWaybillMessage] = useNewWaybillHandler();
    const [NewInvoiceHandlerComponent, handleNewInvoiceMessage] = useNewInvoiceHandler();
    const [PointPassHandlerComponent, handlePointPassMessage] = usePointPassHandler()
    const [InvoiceUpdateHandlerComponent, handleInvoiceUpdateMessage] = useInvoiceUpdateHandler()
    const [InvoiceStatusUpdateHandlerComponent, handleInvoiceStatusUpdateMessage] = useInvoiceStatusUpdateHandler();

    const subscribeToPrivateUrl = (stompClient) => {
        const privateUrl = `/user/${props.userId}/queue/messages`
        stompClient.subscribe(privateUrl, onMessageReceive)
    }

    const onSocketConnect = (stompClient) => {
        showToast("Connected to real-time messaging")
        setCurrentStompClient(stompClient);
        subscribeToPrivateUrl(stompClient);
    }

    const onSocketError = () => {
        setCurrentStompClient(null);
        showToast("Cannot connect to real-time messaging", "warning")
    }

    const connectToServer = () => {
        let SockJs = require("sockjs-client");
        SockJs = new SockJs("http://localhost:8080/ws");
        return Stomp.over(SockJs);
    }


    const onMessageReceive = (msg) => {
        const messageData = JSON.parse(msg.body);
        switch (messageData.notificationType) {
            case "NEW_INVOICE":
                handleNewInvoiceMessage(messageData, openActionToast);
                break;
            case "NEW_WAYBILL":
                handleNewWaybillMessage(messageData, openActionToast);
                break;
            case "INVOICE_STATUS_UPDATE":
                handleInvoiceStatusUpdateMessage(messageData, openActionToast, showToast)
                break;
            case "INVOICE_UPDATE":
                handleInvoiceUpdateMessage(messageData, openActionToast);
                break;
            case "POINT_PASS":
                handlePointPassMessage(messageData, openActionToast);
                break;
            default:
                showToast("Some notification has come");
        }
    }

    useEffect(() => {
        if (props.role !== 'UNKNOWN') {
            let stompClient = connectToServer();
            stompClient.connect({}, () => onSocketConnect(stompClient), () => onSocketError());
        } else {
            console.log("DROP CONNECTION")
        }
    }, [props.role])


    return (
        <div style={{zIndex: 999}}>
            {ActionToastComponent}
            {ToastComponent}

            {NewInvoiceHandlerComponent}
            {PointPassHandlerComponent}
            {InvoiceUpdateHandlerComponent}
            {NewWaybillHandlerComponent}
            {InvoiceStatusUpdateHandlerComponent}
        </div>
    )
})