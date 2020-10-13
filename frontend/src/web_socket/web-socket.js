import React, {useEffect, useState} from "react";
import useToast from "../components/parts/toast-notification/useToast";
import {connect} from "react-redux";
import * as Stomp from "stompjs"
import useInvoiceConfirmationForm from "./hooks/useInvoiceConfirmationForm";
import useActionToast from "./hooks/toast/use-action-toast";


const mapStateToProps = (store) => {
    console.log("Store: ", store);
    return {
        userId: store.user.id,
        role: store.user.roles[0]
    }
};

export const WebSocket = connect(mapStateToProps)((props) => {
    const [currentStompClient, setCurrentStompClient] = useState(null);
    const [ToastComponent, showToast] = useToast();
    const [InvoiceDialogComponent, openInvoiceDialog] = useInvoiceConfirmationForm();
    const [ActionToastComponent, openActionToast] = useActionToast()

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

    const handleNewInvoiceMessage = (messageData) => {
        openActionToast(`New invoice!`, () => openInvoiceDialog(messageData.invoiceId));
    }

    const onMessageReceive = (msg) => {
        const messageData = JSON.parse(msg.body);
        switch (messageData.notificationType) {
            case "NEW_INVOICE":
                handleNewInvoiceMessage(messageData);
                break;
            case "NEW_WAYBILL":
                showToast("New waybill");
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
            {InvoiceDialogComponent}
            {ActionToastComponent}
            {ToastComponent}
        </div>
    )
})