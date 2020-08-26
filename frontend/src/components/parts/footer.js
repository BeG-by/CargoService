import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import {Copyright} from "./copyright";

let drawerWidth;

const useStyles = makeStyles((theme) => ({
    footer: {
        minWidth: '240px',
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        height: '60px',
        backgroundColor:'#3f51b5',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: '400',
        color: 'white',
    },
    footerShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

export const Footer = (props) => {
    drawerWidth = props.drawerWidth;
    const classes = useStyles();
    return (
        <footer className={ clsx (classes.footer,
            {[classes.footerShift]: props.openMenu,})}>
            <Container >
                <Copyright />
            </Container>
        </footer>
    );
}