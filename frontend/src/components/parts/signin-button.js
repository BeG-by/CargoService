import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import LoginForm from "../login-form";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

export const SigninButton = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.sectionDesktop}>
            <Button variant="outlined"
                    color="inherit"
                    onClick={props.handleClickOpen}>
                Sign in
            </Button>
            <Dialog onClose={props.handleClose}
                    aria-labelledby="simple-dialog-title"
                    open={props.openDialog}>
                <LoginForm/>
            </Dialog>
        </div>
    );
}