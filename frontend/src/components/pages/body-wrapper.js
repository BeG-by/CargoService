import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

export const DRAWER_WIDTH = 240;

export const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: DRAWER_WIDTH,
    },
    mainField: {
        display: "block",
        flexDirection: "column",
        paddingTop: "30px",
        paddingBottom: "30px",
        paddingLeft: "5px",
        paddingRight: "5px",
        margin: "auto",
        color: "white",
        background: "rgba(0, 0, 0, 0.4)",
        maxWidth: '100%',
        borderRadius: "30px",
    },
    mainParagraph: {
        fontSize: "22px",
        paddingTop: "20px",
    },
}));


export const BodyWrapper = (props) => {
    const classes = useStyles();

    return (
        <main
            // className={clsx(classes.content, {
            //     [classes.contentShift]: props.openMenu,
            // })}
        >
            {/*<div className={classes.drawerHeader}/>*/}
            {/*<div className={classes.mainField}>*/}
                {props.content()}
            {/*</div>*/}
        </main>
    );
}