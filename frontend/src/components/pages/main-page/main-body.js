import React from "react";
import clsx from "clsx";
import MainBodyDispatcher from "./main-body-dispatcher";
import MainBodyAdmin from "./main-body-admin";
import MainBodySysadmin from "./main-body-sysadmin";
import MainBodyManager from "./main-body-manager";
import MainBodyDriver from "./main-body-driver";
import MainBodyOwner from "./main-body-owner";

//fixme исправить содержимое тела главной страницы
export const MainBody = (props) => {
    const tableIcons = props.tableIcons;
    const classes = props.classes;
    let content;
    let role = props.role;
    switch (role) {
        case 'sysadmin':
            content = <MainBodySysadmin classes={classes} tableIcons={tableIcons}/>
            break;
        case 'admin':
            content = <MainBodyAdmin classes={classes} tableIcons={tableIcons}/>
            break;
        case 'dispatcher':
            content = <MainBodyDispatcher classes={classes} tableIcons={tableIcons}/>
            break;
        case 'manager':
            content = <MainBodyManager classes={classes} tableIcons={tableIcons}/>
            break;
        case 'driver':
            content = <MainBodyDriver classes={classes} tableIcons={tableIcons}/>
            break;
        case 'owner':
            content = <MainBodyOwner classes={classes} tableIcons={tableIcons}/>
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
}