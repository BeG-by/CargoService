import React from "react";
import "./App.css";
import interceptors from "../security/interceptors";
import {Redirect, Route, Switch} from "react-router-dom";
import {NotFound} from "./pages/error-page/error-404";
import {Header} from "./parts/layout/header";
import CssBaseline from "@material-ui/core/CssBaseline";
import {DrawerMenu} from "./parts/layout/drawer";
import WelcomeBody from "./pages/welcome-body";
import {Footer} from "./parts/layout/footer";
import {MainBody} from "./pages/main-body";
import {WaybillsTable} from "./roles/driver/waybills-table"
import InfoBody from "./pages/info-body";
import SendMailBody from "./pages/send-mail-body";
import ContactsBody from "./pages/contacts-body";
import InvoicesTable from "./roles/manager/invoices-table";
import {UserTable} from "./roles/admin/users/user-table";
import {ProductOwnersTable} from "./roles/dispatcher/product-owners/product-owners-table";
import {AutoTable} from "./roles/admin/autos/auto-table";
import {StorageTable} from "./roles/dispatcher/storages/storages-table";
import {ClientsTable} from "./roles/sysadmin/clients-table";
import PrivateRoute from "../security/private-route";
import {
    ROLE_ADMIN,
    ROLE_DISPATCHER,
    ROLE_MANAGER,
    ROLE_DRIVER,
    ROLE_OWNER,
    ROLE_SYSADMIN
} from "../security/private-route";
import {ProfileInfo} from "./pages/profile-info";
import CurrentWaybillBody from "./pages/current-waybill-page";
import RegistrationForm from "./forms/registration/registration-form";

export default function App() {
    const [openMenu, setOpenMenu] = React.useState(false);

    const handleMenuOpen = () => {
        setOpenMenu(true);
    };
    const handleMenuClose = () => {
        setOpenMenu(false);
    };

    return (
        <div className="App">
            <div className="App-body">
                <Header
                    openMenu={openMenu}
                    handleDrawerOpen={handleMenuOpen}
                />
                <DrawerMenu
                    openMenu={openMenu}
                    handleDrawerClose={handleMenuClose}
                />
                <Switch>
                    <Route exact path="/" component={WelcomeBody}/>
                    <Route exact path="/info" component={InfoBody}/>
                    <Route exact path="/email" component={SendMailBody}/>
                    <Route exact path="/contacts" component={ContactsBody}/>
                    <Route exact path="/registration" component={RegistrationForm}/>
                    <PrivateRoute exact path="/main" component={MainBody}/>
                    <PrivateRoute exact path="/profile" component={ProfileInfo}/>
                    <PrivateRoute exact path="/waybill" component={WaybillsTable}
                                  hasAnyAuthorities={[ROLE_MANAGER, ROLE_OWNER, ROLE_DRIVER]}/>
                    <PrivateRoute exact path={"/invoice"} component={InvoicesTable}
                                  hasAnyAuthorities={[ROLE_MANAGER, ROLE_OWNER, ROLE_DRIVER, ROLE_DISPATCHER]}/>
                    <PrivateRoute exact path={"/users"} component={UserTable}
                                  hasAnyAuthorities={[ROLE_ADMIN, ROLE_OWNER]}/>
                    <PrivateRoute exact path={"/autos"} component={AutoTable}
                                  hasAnyAuthorities={[ROLE_DISPATCHER, ROLE_ADMIN, ROLE_OWNER]}/>
                    <PrivateRoute exact path={"/owners"} component={ProductOwnersTable}
                                  hasAnyAuthorities={[ROLE_DISPATCHER, ROLE_OWNER]}/>
                    <PrivateRoute exact path={"/storages"} component={StorageTable}
                                  hasAnyAuthorities={[ROLE_DISPATCHER, ROLE_ADMIN, ROLE_OWNER]}/>
                    <PrivateRoute exact path={"/current"} component={CurrentWaybillBody}
                                  hasAnyAuthorities={[ROLE_DRIVER]}/>
                    <Route exact path={"/success"}><Redirect to={"/main"}/></Route> // TODO ???
                    <PrivateRoute exact path={"/clients"} component={ClientsTable} hasAnyAuthorities={[ROLE_SYSADMIN]}/>
                    <Route component={NotFound}/>
                </Switch>
                <CssBaseline/>
                <Footer/>
            </div>
        </div>
    );
}

