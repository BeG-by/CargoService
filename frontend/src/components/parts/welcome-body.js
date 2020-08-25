import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

let drawerWidth;

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    mainField: {
        display: 'block',
        flexDirection: 'column',
        paddingTop: '30px',
        paddingBottom: '30px',
        margin: '20px auto',
        color: 'white',
        background: 'rgba(0, 0, 0, 0.4)',
        maxWidth: '800px',
        borderRadius: '30px',
    },
    mainParagraph: {
        fontSize: '22px',
        paddingTop: '20px',
    },
}));

export const WelcomeBody = (props) => {
    drawerWidth = props.drawerWidth;
    const classes = useStyles();
    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: props.openMenu,
            })}
        >
            <div className={classes.drawerHeader}/>

            <div className={classes.mainField}>
                <Typography
                    variant="h4"
                    style={{fontStyle: 'oblique'}}>
                    Welcome!
                </Typography>
                <Typography
                    className={classes.mainParagraph}
                    paragraph>
                    This application is ready to offer our customers easy and reliable control
                    over the movement of the necessary goods.
                </Typography>
                <Typography
                    className={classes.mainParagraph}
                    paragraph>
                    Please sign in to access all features you need.
                </Typography>
            </div>
        </main>
    );
}