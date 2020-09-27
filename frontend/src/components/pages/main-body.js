import React from "react";
import ProductOwnersTable from "../roles/dispatcher/product-owners-table";
import InvoicesTable from "../roles/manager/invoices-table";
import ClientsTable from "../roles/sysadmin/clients-table";
import UserTable from "../roles/admin/user-table";
import {connect} from "react-redux";

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
            content = () => {return "Driver..."};
            break;
        case 'OWNER':
            content = () => {return "Owner..."};
            break;
        default:
            content = () => {return "Loading..."};
    }

    return content;

});