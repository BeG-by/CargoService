import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

function handleLogout() {
    window.location.href = "/";
    localStorage.clear();
}

export const SignoutButton = () => {
    const classes = useStyles();
    return (
        <div className={classes.sectionDesktop}>
            <Button variant="outlined"
                    color="inherit"
                    onClick={handleLogout}>
                Sign out
            </Button>
        </div>
    );
}