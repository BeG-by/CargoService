import React from "react";
import clsx from "clsx";
import MainBodyDispatcher from "./main-body-dispatcher";
import MainBodyAdmin from "./main-body-admin";
import MainBodySysadmin from "./main-body-sysadmin";
import MainBodyManager from "./main-body-manager";
import MainBodyDriver from "./main-body-driver";
import MainBodyOwner from "./main-body-owner";

export const MainBody = (props) => {
    const classes = props.classes;
    let content;
    let role = props.role;
    switch (role) {

        case 'SYSADMIN':
            content = <MainBodySysadmin classes={classes}/>
            break;
        case 'ADMIN':
            content = <MainBodyAdmin classes={classes}/>
            break;
        case 'DISPATCHER':
            content = <MainBodyDispatcher classes={classes}/>
            break;
        case 'MANAGER':
            content = <MainBodyManager classes={classes}/>
            break;
        case 'DRIVER':
            content = <MainBodyDriver classes={classes}/>
            break;
        case 'OWNER':
            content = <MainBodyOwner classes={classes}/>
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