import clsx from "clsx";
import axios from "axios";
import React, {useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {SignoutButton} from "./buttons/signout-button";
import {SigninButton} from "./buttons/signin-button";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeUserAndCompany} from "../store/actions";

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

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        changeUserAndCompany: bindActionCreators(changeUserAndCompany, dispatch)
    }
};

const getUserInfoRequest = () => {

    const endpoint = "/v1/api/users/info";
    return axios({
        method: "GET",
        url: endpoint,
    })

};


export const Header = connect(mapStateToProps, mapActionsToProps)((props) => {

    drawerWidth = props.drawerWidth;
    const user = props.user;
    const isAuthenticate = localStorage.getItem("authorization") !== null;
    const headerText = "Manage your cargo with convenient digital tools";

    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);

    const getUserInfo = async () => {
        try {
            const response = await getUserInfoRequest();
            const user = response.data.user;
            const clientCompany = response.data.company;
            props.changeUserAndCompany(user, clientCompany);
        } catch (error) {
            alert(error); // TODO notification
        }
    };


    useEffect(() => {
        if (isAuthenticate) {
            getUserInfo();
        }
    }, []);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const renderHeaderText = () => {
        return isAuthenticate ? user.name + " " + user.surname + ", " + user.roles : headerText
    };


    const LoginButton = () => {
        return isAuthenticate ?
            <SignoutButton/> :
            <SigninButton openDialog={openDialog}
                          handleClickOpen={handleClickOpen}
                          handleClose={handleClose}/>;
    };


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
                    CARGO APP
                </Typography>
                <div className={classes.grow}/>
                <Typography className={classes.welcome}>
                    {renderHeaderText()}
                </Typography>
                <div className={classes.grow}/>
                <LoginButton/>
            </Toolbar>
        </AppBar>
    );
});
