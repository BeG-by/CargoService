import {makeStyles, useTheme} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {ItemInvoiceList} from "../drawer-items/item-invoice-list";
import {ItemWaybillList} from "../drawer-items/item-waybill-list";
import {ItemInfo} from "../drawer-items/item-info";
import {ItemContacts} from "../drawer-items/item-contacts";
import {ItemOwnerTable} from "../drawer-items/item-product-owner";
import {connect} from "react-redux";
import {ItemUserTable} from "../drawer-items/item-user-list";
import {ItemAutosTable} from "../drawer-items/item-auto";
import {ItemStorages} from "../drawer-items/item-storages";
import {ItemProfile} from "../drawer-items/item-profile";
import {ItemClientTable} from "../drawer-items/item-clients";
import {ItemCurrentWaybill} from "../drawer-items/item-current-waybill";
import {ItemReports} from "../drawer-items/item-reports";
import {ItemCalendar} from "../drawer-items/item-calendar";
import {ItemLoadPage} from "../drawer-items/item-load-page";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));


const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const DrawerMenu = connect(mapStateToProps)((props) => {

    const classes = useStyles();
    const theme = useTheme();
    const components = [];

    switch (props.role) {
        case 'SYSADMIN':
            components.push(<ItemClientTable key="Clients"/>);
            components.push(<Divider key='Divider'/>);
            components.push(<ItemProfile key="Profile"/>)
            components.push(<Divider key='SecondDivider'/>);
            break;
        case 'ADMIN':
            components.push(<ItemUserTable key="Users"/>);
            components.push(<ItemAutosTable key="Autos"/>);
            components.push(<ItemStorages key='Storages'/>);
            components.push(<Divider key='Divider'/>);
            components.push(<ItemProfile key="Profile"/>);
            components.push(<Divider key='SecondDivider'/>);
            break;
        case 'DISPATCHER':
            components.push(<ItemOwnerTable key="Product owners"/>);
            components.push(<ItemInvoiceList key='Invoices'/>);
            components.push(<ItemStorages key='Storages'/>);
            components.push(<ItemAutosTable key="Autos"/>);
            components.push(<Divider key='Divider'/>);
            components.push(<ItemProfile key="Profile"/>);
            components.push(<Divider key='SecondDivider'/>);
            break;
        case 'DRIVER':
            components.push(<ItemCurrentWaybill key='Current waybill'/>);
            components.push(<ItemInvoiceList key='Invoices'/>);
            components.push(<ItemWaybillList key='Waybills'/>);
            components.push(<Divider key='Divider'/>);
            components.push(<ItemProfile key="Profile"/>);
            components.push(<Divider key='SecondDivider'/>);
            break;
        case 'MANAGER':
            components.push(<ItemInvoiceList key='Invoices'/>);
            components.push(<ItemWaybillList key='Waybills'/>);
            components.push(<ItemCalendar key='Calendar'/>);
            components.push(<Divider key='Divider'/>);
            components.push(<ItemProfile key="Profile"/>);
            components.push(<Divider key='SecondDivider'/>);
            break;
        case 'OWNER':
            components.push(<ItemReports key="Reports"/>);
            components.push(<Divider key='BeforeDivider'/>);
            components.push(<ItemUserTable key="Employees"/>);
            components.push(<ItemStorages key='Storages'/>);
            components.push(<ItemAutosTable key="Autos"/>);
            components.push(<ItemOwnerTable key="Product owners"/>);
            components.push(<ItemInvoiceList key='Invoices'/>);
            components.push(<ItemWaybillList key='Waybills'/>);
            components.push(<Divider key='Divider'/>);
            components.push(<ItemProfile key="Profile"/>);
            components.push(<Divider key='SecondDivider'/>);
            break;
        default:
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.openMenu}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={props.handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            <List>
                {components}
            </List>
            <List>
                {props.role === "UNKNOWN" ? "" : <ItemLoadPage/>}
                <ItemInfo/>
                <ItemContacts/>
            </List>
        </Drawer>
    );
});
