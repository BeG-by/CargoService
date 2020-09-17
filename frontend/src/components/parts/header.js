import clsx from "clsx";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {SignoutButton} from "./buttons/signout-button";
import {SigninButton} from "./buttons/signin-button";
import {Link} from "react-router-dom";
import '../App.css';

let drawerWidth;

const useStyles = makeStyles((theme) => ({
    appBar: {
        minWidth: '250px',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
        textShadow: '1px 1px 2px black',
    },
    welcome: {
        position: 'relative',
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        marginRight: theme.spacing(2),
        fontSize: '18px',
        fontStyle: 'oblique',
    },
    hide: {
        display: 'none',
    },
}));

export const Header = (props) => {
    drawerWidth = props.drawerWidth;
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const backToMain = () => {
        window.location.href = "/mainPage";
    }

    const headerButton = (localStorage.getItem('authorization') != null
        && localStorage.getItem('authorization').trim())
    || (localStorage.getItem('role') != null
        && localStorage.getItem('role').trim())
        ? <SignoutButton/>
        : <SigninButton openDialog={openDialog}
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}/>;
    return (
        <AppBar className={clsx(classes.appBar, {
            [classes.appBarShift]: props.openMenu,
        })}
                position="fixed">
            <Toolbar>
                <IconButton
                    edge="start"
                    onClick={props.handleDrawerOpen}
                    className={clsx(classes.menuButton, props.openMenu && classes.hide)}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon/>
                </IconButton>

                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link to='/mainPage' className="link-item-white">
                        CARGO APP
                        </Link>
                    </Typography>

                <div className={classes.grow}/>
                <Typography className={classes.welcome}>
                    {props.headerText}
                </Typography>
                <div className={classes.grow}/>
                {headerButton}
            </Toolbar>
        </AppBar>
    );
}