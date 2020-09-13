import React from "react";
import Dialog from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";

const styles = (theme) => ({
    root: {
        margin: 0,
        paddingLeft: theme.spacing(5),
        paddingTop: theme.spacing(5),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h5">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close"
                            className={classes.closeButton}
                            onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});




export const DialogWindow = (props) => {

    return (
        <Dialog fullWidth={props.fullWidth}
                maxWidth={props.maxWidth}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
                open={props.openDialog}>
            <DialogTitle style={{color:'#3f51b5', textAlign: "center"}}
                         id="customized-dialog-title"
                         onClose={props.handleClose}>
                {props.dialogTitle}
            </DialogTitle>
            <DialogContent>
            {props.form}
            </DialogContent>
        </Dialog>
    );
}