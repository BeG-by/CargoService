import React from "react";
import {ProductOwnersTable} from "../roles/dispatcher/product-owners/product-owners-table";
import InvoicesTable from "../roles/manager/invoices-table";
import {ClientsTable} from "../roles/sysadmin/clients-table";
import {UserTable} from "../roles/admin/users/user-table";
import {connect} from "react-redux";
import SimpleBackdrop from "../parts/progress/progress";
import CurrentWaybillBody from "./current-waybill-page";

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const MainBody = connect(mapStateToProps)((props) => {
    const role = props.role;
    let content;
    switch (role) {
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
            content = <CurrentWaybillBody/>;
            break;
        case 'OWNER':
            content = () => {return "Owner..."};
            break;
        default:
            content = <SimpleBackdrop/>
    }
    return content;
});