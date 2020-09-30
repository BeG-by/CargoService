import React from "react";
import "./App.css";
import interceptors from "../../src/security/Interceptors";
import {Redirect, Route, Switch} from "react-router-dom";
import {NotFound} from "./pages/error-page/error-404";
import {Header} from "./parts/layout/header";
import CssBaseline from "@material-ui/core/CssBaseline";
import {DrawerMenu} from "./parts/layout/drawer";
import {WelcomeBody} from "./pages/welcome-body";
import {Footer} from "./parts/layout/footer";
import {MainBody} from "./pages/main-body";
import {WaybillsTable} from "./roles/driver/waybills-table"
import {InfoBody} from "./pages/info-body";
import {SendMailBody} from "./pages/send-mail-body";
import {ContactsBody} from "./pages/contacts-body";
import {InvoicesTable} from "./roles/manager/invoices-table";
import UserTable from "./roles/admin/user-table";
import ProductOwnersTable from "./roles/dispatcher/product-owners/product-owners-table";
import DispatcherInvoiceTable from "./roles/dispatcher/invoice/invoice-table";
import {BodyWrapper} from "./pages/body-wrapper";
import {ProfileBody} from "./pages/profile-body";


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
                    <Route exact path={"/"} component={() =>
                        <BodyWrapper openMenu={openMenu} content={WelcomeBody}/>}/>
                    <Route exact path={"/info"} component={() =>
                        <BodyWrapper openMenu={openMenu} content={InfoBody}/>}/>
                    <Route exact path={"/email"} component={() =>
                        <BodyWrapper openMenu={openMenu} content={SendMailBody}/>}/>
                    <Route exact path={"/profile"} component={() =>
                        <BodyWrapper openMenu={openMenu} content={ProfileBody}/>}/>
                    <Route exact path={"/contacts"} component={() =>
                        <BodyWrapper openMenu={openMenu} content={ContactsBody}/>}/>
                    <Route exact path={"/main"} component={() => <MainBody openMenu={openMenu}/>}/>
                    <Route exact path={"/waybill"} component={() =>
                        <BodyWrapper openMenu={openMenu} content={() => <WaybillsTable/>}/>}/>
                    <Route exact path={"/invoice"} component={() =>
                        <BodyWrapper openMenu={openMenu} content={() => <InvoicesTable/>}/>}/>
                    <Route exact path={"/users"} component={UserTable}/>
                    <Route exact path={"/owners"} component={() =>
                        <BodyWrapper openMenu={openMenu} content={() => <ProductOwnersTable/>}/>}/>
                    <Route exact path={"/invoices"} component={DispatcherInvoiceTable}/>
                    <Route exact path={"/success"}><Redirect to={"/main"}/></Route>
                    <Route component={() => <BodyWrapper openMenu={openMenu} content={NotFound}/>}/>
                </Switch>
                <CssBaseline/>
                <Footer openMenu={openMenu}/>
            </div>
        </div>
    );
}
