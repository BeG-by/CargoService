import React from "react"
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

const DEFAULT_DURATION = 6000;

export default function ActionToast(props) {
    const {onViewClick, open, text, onClose} = props;

    const handleClose = () => {
        onClose();
    }

    const handleViewClick = () => {
        onViewClick();
    }

    return (
        <Snackbar open={open}
                  autoHideDuration={DEFAULT_DURATION}
                  anchorOrigin={{vertical: "top", horizontal: "right"}}
                  key={"action_toast_id"}
                  onClose={handleClose}>
             <Alert
                onClose={handleClose}
                severity={"info"}
                action={
                    <Button color="primary" size="small" onClick={handleViewClick}>
                        View
                    </Button>
                }>
                {text}
            </Alert>
        </Snackbar>);
}