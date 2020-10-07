import clsx from "clsx";
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
import {changeUserAndCompany, changeUser} from "../../store/actions";
import {DRAWER_WIDTH} from "../styles/styles";
import {Link} from "react-router-dom";
import "../../App.css";
import Avatar from "@material-ui/core/Avatar";
import photo from "../../../resources/images/user_no_photo.png";
import {makeRequest, USER_URL, handleRequestError} from "../util/request-util";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from '@material-ui/icons/Notifications';

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
    spaceAround: {
        marginRight: 20
    }
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
        const userText = !user.name || !user.surname
            ? headerText
            : user.name + " " + user.surname + ", " + user.roles;
        return isAuthenticate ? userText : headerText
    };

    const renderUserPhoto = () => {
        return isAuthenticate
            ? <Link to={"/profile"}
                    className="link-item-white header-link">
                <Avatar alt="avatar"
                        className={classes.spaceAround}
                        src={
                            user.photo !== undefined
                            && user.photo !== null
                            && user.photo.trim()
                                ? user.photo
                                : photo
                        }
                />
            </Link>
            : null;
    }

    const renderCompanyName = () => {
        const companyName = company.name ? company.name : headerCompany;
        return isAuthenticate
            ? <Link to={"/main"} className="link-item-white">{companyName}</Link>
            : headerCompany
    };

    // const handleRefresh = () => {
    //     window.location.reload();
    // };

    // const renderUserNotifications = () => {
    //     return isAuthenticate
    //         ? <IconButton onClick={handleRefresh}
    //                       aria-label="documents for work"
    //                       color="inherit">
    //             <Badge badgeContent={17}
    //                    color="secondary">
    //                 <NotificationsIcon/>
    //             </Badge>
    //         </IconButton>
    //         : null;
    // }

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
                {/*<div className={classes.spaceAround}>*/}
                {/*    {renderUserNotifications()}*/}
                {/*</div>*/}
                <div className={classes.spaceAround}>
                    {renderUserPhoto()}
                </div>
                <LoginButton/>
            </Toolbar>
        </AppBar>
    );
});
