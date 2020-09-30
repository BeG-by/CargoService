import React from "react";
import "./App.css";
import interceptors from "../../src/security/Interceptors";
import {Route, Switch} from "react-router-dom";
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
import UserTable from "./roles/admin/users/user-table";
import ProductOwnersTable from "./roles/dispatcher/product-owners/product-owners-table";
import DispatcherInvoiceTable from "./roles/dispatcher/invoice/invoice-table";
import {SuccessBody} from "./pages/success-body";
import AutoTable from "./roles/admin/autos/auto-table";


export default function App() {

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
                    <Route exact path="/main" component={MainBody}/>
                    <Route exact path="/waybill" component={WaybillsTable}/>
                    <Route exact path={"/invoice"} component={InvoicesTable}/>
                    <Route exact path={"/users"} component={UserTable}/>
                    <Route exact path={"/autos"} component={AutoTable}/>
                    <Route exact path={"/owners"} component={ProductOwnersTable}/>
                    <Route exact path={"/invoices"} component={DispatcherInvoiceTable}/>
                    <Route exact path={"/success"} component={SuccessBody}/>
                    <Route component={NotFound}/>
                </Switch>
                <CssBaseline/>
                <Footer openMenu={openMenu}/>
            </div>
        </div>
    );
}

