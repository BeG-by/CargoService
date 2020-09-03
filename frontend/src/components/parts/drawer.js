import {makeStyles, useTheme} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import ListItemText from "@material-ui/core/ListItemText";
import EmailIcon from "@material-ui/icons/Email";
import {ItemDeliveryNoteList} from "./drawer-items/item-delivery-note-list";
import {ItemWaybillList} from "./drawer-items/item-waybill-list";
import {ItemInfo} from "./drawer-items/item-info";

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

let role = localStorage.getItem('role');
let components = [];

switch (role) {
    case 'sysadmin':
        break;
    case 'admin':

        break;
    case 'dispatcher':

        break;
    case 'manager':
        const deliveryNotesList = <ItemDeliveryNoteList/>;
        const waybillList = <ItemWaybillList/>
        components.push(deliveryNotesList);
        components.push(waybillList);
        //добавить в хедер кнопку назад
        //сделать очистку массива после ухода со страницы
        //сделать контакты и почту
        //сделать верификацию для ттн
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
            <Divider/>
            <List>
                <ItemInfo/>
                {['Contacts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{<LocalPhoneIcon color='primary'/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['Send Message'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{<EmailIcon color='primary'/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}