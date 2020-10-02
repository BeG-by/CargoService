import clsx from "clsx";
import axios from "axios";
import React, {useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {SignoutButton} from "../buttons/signout-button";
import {SigninButton} from "../buttons/signin-button";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeUserAndCompany} from "../../store/actions";
import {DRAWER_WIDTH} from "../../pages/body-wrapper";
import {Link} from "react-router-dom";
import "../../App.css";
import Avatar from "@material-ui/core/Avatar";
import photo from "../../../resources/images/user_no_photo.png";
import {makeRequest, USER_URL, handleRequestError} from "../util/request-util";

const drawerWidth = DRAWER_WIDTH;

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
        user: store.user,
        company: store.company
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        changeUserAndCompany: bindActionCreators(changeUserAndCompany, dispatch)
    }
};


export const Header = connect(mapStateToProps, mapActionsToProps)((props) => {

    const {user, company} = props;
    const isAuthenticate = localStorage.getItem("authorization") !== null;
    const headerText = "Manage your cargo with convenient digital tools";
    const headerCompany = "CARGO APP";

    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);

    const getUserInfo = async () => {
        try {
            const response = await makeRequest("GET", USER_URL + "/info");
            const user = response.data.user;
            const clientCompany = response.data.company;
            props.changeUserAndCompany(user, clientCompany);
        } catch (error) {
            handleRequestError(error, alert); // TODO notification
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

    const renderUserName = () => {
        const userText = user.name === undefined || user.surname === undefined
            ? headerText
            : <Link to={"/profile"}
                    className="link-item-white header-link">
                <Avatar alt="avatar"
                        src={user.photo === null || user.photo === undefined
                            ? photo
                            : user.photo}
                        style={{marginLeft: 20, marginRight: 20}}
                />
                {user.name + " " + user.surname + ", " + user.roles}
            </Link>;
        return isAuthenticate
            ? userText
            : headerText
    };

    const renderCompanyName = () => {
        const companyName = company.name === undefined || company.name === null
            ? headerCompany
            : company.name;
        return isAuthenticate
            ? <Link to={"/main"} className="link-item-white">{companyName}</Link>
            : headerCompany
    };

    const LoginButton = () => {
        return isAuthenticate
            ? <SignoutButton/>
            : <SigninButton openDialog={openDialog}
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
                    {renderCompanyName()}
                </Typography>
                <div className={classes.grow}/>
                <Typography className={classes.welcome}>
                    {renderUserName()}
                </Typography>
                <div className={classes.grow}/>
                <LoginButton/>
            </Toolbar>
        </AppBar>
    );
});
