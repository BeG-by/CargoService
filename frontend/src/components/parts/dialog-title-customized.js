import withStyles from "@material-ui/core/styles/withStyles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

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

export const DialogTitleCustomized = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle
            disableTypography
            className={classes.root} {...other}
            style={{color: '#3f51b5', textAlign: "center"}}
            id="customized-dialog-title">
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