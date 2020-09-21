import React from "react";
import "./App.css";
import interceptors from "../../src/security/Interceptors";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NotFound from "./pages/error-page/error-404";
import {Header} from "./parts/header";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {DrawerMenu} from "./parts/drawer";
import {WelcomeBody} from "./pages/welcome-body";
import {Footer} from "./parts/footer";
import {MainBody} from "./pages/main-body";
import {WaybillBody} from "./pages/waybill-body";
import {InfoBody} from "./pages/info-body";
import {SendMailBody} from "./pages/send-mail-body";
import {ContactsBody} from "./pages/contacts-body";
import InvoicesTable from "./roles/manager/invoices-table";
import UserTable from "./roles/admin/user-table";
import {BodyWrapper} from "./pages/body-wrapper";
import ProductOwnersTable from "./roles/dispatcher/product-owners-table";
import DispatcherInvoiceTable from "./roles/dispatcher/invoice/invoice-table";


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


export default function App() {

    const classes = useStyles();
    const [openMenu, setOpenMenu] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);


    const handleMenuOpen = () => {
        setOpenMenu(true);
    };
    const handleMenuClose = () => {
        setOpenMenu(false);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };


    return (
        <div className="App">
            <div className="App-body">
                <Header
                    drawerWidth={drawerWidth}
                    openMenu={openMenu}
                    handleDrawerOpen={handleMenuOpen}
                />
                <DrawerMenu
                    drawerWidth={drawerWidth}
                    openMenu={openMenu}
                    handleDrawerClose={handleMenuClose}
                />
                <Switch>
                    <Route exact path="/"
                           component={() => <WelcomeBody classes={classes} openMenu={openMenu}/>}/>
                    <Route exact path="/info"
                           component={() => <InfoBody classes={classes} openMenu={openMenu}/>}/>
                    <Route exact path="/email"
                           component={() => <SendMailBody classes={classes} openMenu={openMenu}/>}/>
                    <Route exact path="/contacts"
                           component={() => <ContactsBody classes={classes} openMenu={openMenu}/>}/>
                    <Route exact path="/main" component={() =>
                        <MainBody
                            classes={classes}
                            openMenu={openMenu}
                            openDialog={openDialog}
                            handleClose={handleClose}
                        />}/>
                    <Route exact path="/waybill" component={() =>
                        <WaybillBody
                            classes={classes}
                            openMenu={openMenu}
                            openDialog={openDialog}
                            handleClose={handleClose}
                        />}/>
                    <Route exact path={"/invoice"} component={InvoicesTable}/>
                    <Route exact path={"/users"} component={UserTable}/>
                    <Route exact path={"/owners"} component={ProductOwnersTable}/>
                    <Route exact path={"/invoices"} component={DispatcherInvoiceTable}/>
                    <Route component={NotFound}/>
                </Switch>
                <CssBaseline/>
                <Footer drawerWidth={drawerWidth} openMenu={openMenu}/>
            </div>
        </div>
    );
}

