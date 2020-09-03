import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Header} from "../parts/header";
import {DrawerMenu} from "../parts/drawer";
import {WelcomeBody} from "./welcome-page/welcome-body";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Footer} from "../parts/footer";
import {MainBody} from "./main-page/main-body";
import {SignoutButton} from "../parts/buttons/signout-button";
import {SigninButton} from "../parts/buttons/signin-button";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
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
        paddingLeft: '5px',
        paddingRight: '5px',
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

export default function PageTemplate(props) {
    const classes = useStyles();

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpenMenu(true);
    };
    const handleDrawerClose = () => {
        setOpenMenu(false);
    };
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    let page = props.page;
    let body;
    let headerText;
    let headerButton;
    switch (page) {
        case 'welcome':
            body = <WelcomeBody classes={classes}
                                openMenu={openMenu}
            />;
            headerText = 'Manage your cargo with convenient digital tools';
            headerButton = localStorage.getItem('authorization') != null
            && localStorage.getItem('authorization').trim() ?
                <SignoutButton/> :
                <SigninButton openDialog={openDialog}
                              handleClickOpen={handleClickOpen}
                              handleClose={handleClose}/>;
            break;
        case 'main':
            localStorage.setItem("role", "manager");//fixme передать роль в параметрах?
            let role = localStorage.getItem("role");
            body = <MainBody classes={classes}
                             openMenu={openMenu}
                             role={role}/>;
            headerText = <i>Hello, {role}!</i>; //fixme исправить заголовок, добавить иконку
            headerButton = <SignoutButton/>;
            break
        default:
    }

    return (
        <div className={classes.grow}>
            <Header drawerWidth={drawerWidth}
                    openMenu={openMenu}
                    openDialog={openDialog}
                    handleDrawerOpen={handleDrawerOpen}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    headerText={headerText}
                    headerButton={headerButton}
            />
            <DrawerMenu drawerWidth={drawerWidth}
                        openMenu={openMenu}
                        handleDrawerClose={handleDrawerClose}
            />
            {body}
            <CssBaseline/>
            <Footer drawerWidth={drawerWidth}
                    openMenu={openMenu}
            />
        </div>
    );
}