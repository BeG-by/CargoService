import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Copyright} from "./copyright";

const useStyles = makeStyles((theme) => ({
    footer: {
        minWidth: '240px',
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        height: '60px',
        backgroundColor: '#3f51b5',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: '400',
        color: 'white'
    },
}));

export const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={clsx(classes.footer)}>
            <Copyright/>
        </footer>
    );
};