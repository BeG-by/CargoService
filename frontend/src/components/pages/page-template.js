import { makeStyles } from "@material-ui/core/styles";
import React, { forwardRef } from "react";
import { Header } from "../parts/header";
import { DrawerMenu } from "../parts/drawer";
import { WelcomeBody } from "./welcome-page/welcome-body";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Footer } from "../parts/footer";
import { MainBody } from "./main-page/main-body";
import { InvoiceInfo } from "../parts/invoices-table-and-info/invoice-info";
import { WaybillBody } from "./waybill-page/waybill-body";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { InfoBody } from "./info-page/info-body";
import { SendMailBody } from "./send-mail-page/send-mail-body";
import { ContactsBody } from "./contacts-page/contacts-body";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

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
          tableIcons={tableIcons}
        />
      );
      break;
    case "info":
      body = (
        <InfoBody
          classes={classes}
          openMenu={openMenu}
          tableIcons={tableIcons}
        />
      );
      break;
    case "sendMail":
      body = (
        <SendMailBody
          classes={classes}
          openMenu={openMenu}
          tableIcons={tableIcons}
        />
      );
      break;
    case "contacts":
      body = (
        <ContactsBody
          classes={classes}
          openMenu={openMenu}
          tableIcons={tableIcons}
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
          tableIcons={tableIcons}
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
          tableIcons={tableIcons}
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
