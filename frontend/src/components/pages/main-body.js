import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
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
    const classes = props.classes;
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
            content = <Typography
                className={classes.mainParagraph}
                paragraph>WELCOME TO CARGO MANAGER!
            </Typography>;
            break;
        case 'OWNER':
            content = <Typography
                className={classes.mainParagraph}
                paragraph>WELCOME TO CARGO MANAGER!
            </Typography>;
            break;
        default:
    }

    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: props.openMenu,
            })}
        >
            <div className={classes.drawerHeader}/>
            <div className={classes.mainField}>
                {content}
            </div>
        </main>
    );
});