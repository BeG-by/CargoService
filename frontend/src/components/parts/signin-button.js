import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {DialogWindow} from "./dialog";

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
            <DialogWindow
                dialogTitle="Entry:"
                handleClose={props.handleClose}
                openDialog={props.openDialog}/>
        </div>
    );
}