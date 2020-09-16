import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Header} from "../parts/header";
import {DrawerMenu} from "../parts/drawer";
import {WelcomeBody} from "./welcome-page/welcome-body";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Footer} from "../parts/footer";
import {MainBody} from "./main-page/main-body";
import {WaybillBody} from "./waybill-page/waybill-body";
import {InfoBody} from "./info-page/info-body";
import {SendMailBody} from "./send-mail-page/send-mail-body";
import {ContactsBody} from "./contacts-page/contacts-body";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    marginLeft: drawerWidth,
  },
  mainField: {
    display: "block",
    flexDirection: "column",
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingLeft: "5px",
    paddingRight: "5px",
    margin: "20px auto",
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

export default function PageTemplate(props) {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDrawerOpen = () => {
    setOpenMenu(true);
  };
  const handleDrawerClose = () => {
    setOpenMenu(false);
  };

  let page = props.page;
  let body;
  let headerText = "Manage your cargo with convenient digital tools";
  let role = localStorage.getItem("role");

  switch (page) {
    case "welcome":
      body = (
        <WelcomeBody
          classes={classes}
          openMenu={openMenu}
        />
      );
      break;
    case "info":
      body = (
        <InfoBody
          classes={classes}
          openMenu={openMenu}
        />
      );
      break;
    case "sendMail":
      body = (
        <SendMailBody
          classes={classes}
          openMenu={openMenu}
        />
      );
      break;
    case "contacts":
      body = (
        <ContactsBody
          classes={classes}
          openMenu={openMenu}
        />
      );
      break;
    case "main":
      body = (
        <MainBody
          classes={classes}
          openMenu={openMenu}
          openDialog={openDialog}
          handleClose={handleClose}
          role={role}
        />
      );
      headerText = <i>Hello, {role}!</i>;
      break;
    case "waybill":
      body = (
        <WaybillBody
          classes={classes}
          openMenu={openMenu}
          openDialog={openDialog}
          handleClose={handleClose}
          role={role}
        />
      );
      headerText = <i>Hello, {role}!</i>;
      break;
    default:
  }

  return (
    <div className={classes.grow}>
      <Header
        drawerWidth={drawerWidth}
        openMenu={openMenu}
        handleDrawerOpen={handleDrawerOpen}
        headerText={headerText}
      />
      <DrawerMenu
        drawerWidth={drawerWidth}
        openMenu={openMenu}
        handleDrawerClose={handleDrawerClose}
      />
      {body}
      <CssBaseline />
      <Footer drawerWidth={drawerWidth} openMenu={openMenu} />
    </div>
  );
}
