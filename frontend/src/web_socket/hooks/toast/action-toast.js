import React from "react"
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Button from "@material-ui/core/Button";

const DEFAULT_DURATION = 15 * 1000;

export default function ActionToast(props) {
    const {onViewClick, open, title, text, onClose} = props;

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
            <MuiAlert
                elevation={6} variant="filled"
                onClose={handleClose}
                severity={"info"}
                action={
                    <Button color="primary" style={{color: "white"}} size="small" onClick={handleViewClick}>
                    View
                    </Button>
                }>
                <AlertTitle>{title}</AlertTitle>
                {text}
            </MuiAlert>
        </Snackbar>);
}