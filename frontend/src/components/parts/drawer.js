import {makeStyles, useTheme} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {ItemDeliveryNoteList} from "./drawer-items/item-delivery-note-list";
import {ItemWaybillList} from "./drawer-items/item-waybill-list";
import {ItemInfo} from "./drawer-items/item-info";
import {ItemContacts} from "./drawer-items/item-contacts";
import {ItemSendMail} from "./drawer-items/item-send-mail";

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

switch (role) {
    case 'sysadmin':
        break;
    case 'admin':

        break;
    case 'dispatcher':

        break;
    case 'manager':
        const deliveryNotesList = <ItemDeliveryNoteList key='Delivery notes'/>;
        const waybillList = <ItemWaybillList key='Waybills'/>;
        const divider = <Divider key='Divider'/>;
        components.push(deliveryNotesList);
        components.push(waybillList);
        components.push(divider);
        break;
    case 'driver':

        break;
    case 'owner':

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