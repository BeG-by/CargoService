import React, {useEffect, useState} from "react";
import useToast from "../components/parts/toast-notification/useToast";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import * as Stomp from "stompjs"


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
        const data = JSON.parse(msg.body);
        showToast(`New invoice!`)
    }

    useEffect(() => {
        if (props.role !== 'UNKNOWN') {
            let stompClient = connectToServer();
            stompClient.connect({}, () => onSocketConnect(stompClient), () => onSocketError());
        } else {
            console.log("DROP CONNECTION")
        }
    }, [props.role])

    const handleClick = () => {
        const message = {
            senderId: props.userId,
            recipientId: 3,
            message: "I'am in!"
        }
        currentStompClient.send("/app/chat", {}, JSON.stringify(message));
    }

    return (
        <div style={{zIndex: 999, margin: 200}}>
            {ToastComponent}
        </div>
    )
})