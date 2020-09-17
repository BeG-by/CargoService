import {makeStyles, useTheme} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {ItemInvoiceList} from "./drawer-items/item-invoice-list";
import {ItemWaybillList} from "./drawer-items/item-waybill-list";
import {ItemInfo} from "./drawer-items/item-info";
import {ItemContacts} from "./drawer-items/item-contacts";
import {ItemSendMail} from "./drawer-items/item-send-mail";
import {ItemClientTable} from "./drawer-items/item-clients-company";

let drawerWidth;

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

const role = localStorage.getItem('role');
let components = [];

//todo для каждого свои кнопки
switch (role) {
    case 'SYSADMIN':
        components.push(<ItemClientTable key="Client table"/>);
        components.push(<Divider key='Divider'/>);
        break;
    case 'ADMIN':

        break;
    case 'DISPATCHER':

        break;
    case 'MANAGER':
        components.push(<ItemInvoiceList key='Invoices'/>);
        components.push(<ItemWaybillList key='Waybills'/>);
        components.push(<Divider key='Divider'/>);
        break;
    case 'DRIVER':

        break;
    case 'OWNER':

        break;
    default:
}

export const DrawerMenu = (props) => {
    drawerWidth = props.drawerWidth;
    const classes = useStyles();
    const theme = useTheme();
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
}