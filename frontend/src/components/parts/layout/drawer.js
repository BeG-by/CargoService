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
import {ItemSendMail} from "../drawer-items/item-send-mail";
import {ItemClientTable} from "../drawer-items/item-clients-company";
import {connect} from "react-redux";
import {ItemUserTable} from "../drawer-items/item-user-list";
import {DRAWER_WIDTH} from "../../pages/body-wrapper";
import ItemInvoices from "../drawer-items/item-dispatcher-invoice-list";
import {ItemAutosTable} from "../drawer-items/item-auto";


const drawerWidth = DRAWER_WIDTH;

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
            break;
        case 'ADMIN':
            components.push(<ItemUserTable key="Users"/>);
            components.push(<ItemAutosTable key="Autos"/>);
            components.push(<Divider key='Divider'/>);
            break;
        case 'DISPATCHER':
            components.push(<ItemClientTable key="Product owners"/>);
            components.push(<ItemInvoices key='Invoices'/>);
            components.push(<Divider key='Divider'/>);
            break;
        case 'DRIVER':
        case 'MANAGER':
            components.push(<ItemInvoiceList key='Invoices'/>);
            components.push(<ItemWaybillList key='Waybills'/>);
            components.push(<Divider key='Divider'/>);
            break;
        case 'OWNER':
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
                <ItemInfo/>
                <ItemContacts/>
            </List>
            <Divider/>
            <List>
                <ItemSendMail/>
            </List>
        </Drawer>
    );
});
