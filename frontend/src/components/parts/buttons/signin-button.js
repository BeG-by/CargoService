import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {DialogWindow} from "../dialogs/dialog";
import LoginForm from "../../forms/login-form/login-form";

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

export const SigninButton = (props) => {

    const {handleClose, openDialog, handleClickOpen} = props;

    const classes = useStyles();
    const form = <LoginForm/>;
    return (
        <div className={classes.sectionDesktop}>
            <Button variant="outlined"
                    color="inherit"
                    onClick={handleClickOpen}>
                Sign in
            </Button>
            <LoginForm
                onClose={handleClose}
                open={openDialog}
            />
            {/*<DialogWindow*/}
            {/*    fullWidth="true"*/}
            {/*    maxWidth="xs"*/}
            {/*    dialogTitle="Entry:"*/}
            {/*    handleClose={props.handleClose}*/}
            {/*    openDialog={props.openDialog}*/}
            {/*    form={form}/>*/}
        </div>
    );
}