import React from "react"
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const DEFAULT_DURATION = 15 * 1000;

export default function ActionToast(props) {
    const {onViewClick, open, title, text, onClose} = props;

    const handleClose = () => {
        onClose();
    }

    const handleViewClick = () => {
        onViewClick();
        onClose();
    }

    return (
        <Snackbar open={open}
                  autoHideDuration={DEFAULT_DURATION}
                  style={{marginTop: 75}}
                  anchorOrigin={{vertical: "top", horizontal: "right"}}
                  key={"action_toast_id"}
                  onClose={handleClose}>
            <Alert
                elevation={6}
                onClose={handleClose}
                severity={"info"}
                action={
                    <Button color="primary" size="small" onClick={handleViewClick}>
                    View
                    </Button>
                }>
                <AlertTitle>{title}</AlertTitle>
                {text}
            </Alert>
        </Snackbar>);
}