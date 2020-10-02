import React from "react";
import ProductOwnersTable from "../roles/dispatcher/product-owners/product-owners-table";
import InvoicesTable from "../roles/manager/invoices-table";
import ClientsTable from "../roles/sysadmin/clients-table";
import UserTable from "../roles/admin/users/user-table";
import {WaybillsTable} from "../roles/driver/waybills-table";
import {connect} from "react-redux";
import {NotAuthorized} from "./error-page/error-401";

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const MainBody = connect(mapStateToProps)((props) => {
    let content;

    switch (props.role) {

        case 'SYSADMIN':
            content = <ClientsTable/>;
            break;
        case 'ADMIN':
            content = <UserTable/>;
            break;
        case 'DISPATCHER':
            content = <ProductOwnersTable/>;
            break;
        case 'MANAGER':
            content = <InvoicesTable/>;
            break;
        case 'DRIVER':
            content = <WaybillsTable/>;
            break;
        case 'OWNER':
            content = () => {return "Owner..."}
            break;
        default:
            content = <NotAuthorized/>;
    }

    return content;

});