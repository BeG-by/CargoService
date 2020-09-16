import React from "react";
import clsx from "clsx";
import MainBodyDispatcher from "./main-body-dispatcher";
import MainBodyAdmin from "./main-body-admin";
import MainBodySysadmin from "./main-body-sysadmin";
import MainBodyManager from "./main-body-manager";
import MainBodyDriver from "./main-body-driver";
import MainBodyOwner from "./main-body-owner";

export const MainBody = (props) => {
    const tableIcons = props.tableIcons;
    const classes = props.classes;
    let content;
    let role = props.role;
    switch (role) {

        case 'SYSADMIN':
            content = <MainBodySysadmin classes={classes} tableIcons={tableIcons}/>
            break;
        case 'ADMIN':
            content = <MainBodyAdmin classes={classes} tableIcons={tableIcons}/>
            break;
        case 'DISPATCHER':
            content = <MainBodyDispatcher classes={classes} tableIcons={tableIcons}/>
            break;
        case 'MANAGER':
            content = <MainBodyManager classes={classes} tableIcons={tableIcons}/>
            break;
        case 'DRIVER':
            content = <MainBodyDriver classes={classes} tableIcons={tableIcons}/>
            break;
        case 'OWNER':
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