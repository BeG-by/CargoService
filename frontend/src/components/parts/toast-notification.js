import Snackbar from "@material-ui/core/Snackbar";
import React from "react";
import Alert from "@material-ui/lab/Alert";

const DEFAULT_DURATION = 6000;

/* severety := ["error", "warning", "success", "info"]*/
export function ToastNotification(props) {
    const {text, severity, duration, open, onClose} = props;

    const handleClose = () => {
        onClose();
    }

    return (
        <Snackbar open={open} autoHideDuration={duration || DEFAULT_DURATION} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {text}
            </Alert>
        </Snackbar>
    )
}