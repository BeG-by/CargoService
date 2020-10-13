import React from "react"
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

export default function ActionToast(props) {
    const [onViewClick, open, message, onClose] = props;

    const handleClose = () => {
        onClose();
    }

    const ViewButtonComponent = (
        <Button color="primary" size="small" onClick={onViewClick}>
            View
        </Button>)

    const ToastComponent = (
        <Snackbar open={open}
                  autoHideDuration={DEFAULT_DURATION}
                  anchorOrigin={{vertical, horizontal}}
                  key={vertical + horizontal}
                  onClose={handleClose}
                  action={ViewButtonComponent}>
            <Alert onClose={handleClose} severity={severity}>
                {text}
            </Alert>
        </Snackbar>)

    return (ToastComponent)
}