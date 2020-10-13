import React, {useState} from "react"
import {ToastNotification} from "../../../components/parts/toast-notification/toast-notification";

export default () => {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");

    const openNotificationToast = (text) => {
        setOpen(true);
        setText(text);
        setSeverity(severity);
    };

    const component = (
        <ToastNotification
            text={text}
            severity={severity}
            open={open}
            onClose={() => setOpen(false)}
        />
    );

    return [component, openNotificationToast];
}