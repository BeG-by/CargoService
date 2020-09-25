import React from "react";
import ProductOwnersTable from "../roles/dispatcher/product-owners-table";
import InvoicesTable, {InvoicesTableContent} from "../roles/manager/invoices-table";
import WaybillsTable from "../roles/driver/waybills-table";
import ClientsTable from "../roles/sysadmin/clients-table";
import UserTable from "../roles/admin/user-table";
import {connect} from "react-redux";
import {BodyWrapper} from "./body-wrapper";


const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const MainBody = connect(mapStateToProps)((props) => {
    let content;

    switch (props.role) {

        case 'SYSADMIN':
            content = () => <ClientsTable/>;
            break;
        case 'ADMIN':
            content = () => <UserTable/>;
            break;
        case 'DISPATCHER':
            content = () => <ProductOwnersTable/>;
            break;
        case 'MANAGER':
            content = <InvoicesTableContent/>;
            break;
        case 'DRIVER':
            content = <WaybillsTable/>
            break;
        case 'OWNER':
            content = () => {return "Owner..."}
            break;
        default:
            content = () => {return "Loading..."};
    }

    // return (
    //     <main
    //         className={clsx(classes.content, {
    //             [classes.contentShift]: props.openMenu,
    //         })}
    //     >
    //         <div className={classes.drawerHeader}/>
    //         <div className='main-body-field'>
    //             {content}
    //         </div>
    //     </main>
    // );

    return <BodyWrapper content={content}/>
});