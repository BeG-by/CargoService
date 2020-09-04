import React from "react";
import clsx from "clsx";
import WaybillForm from "../../forms/waybill-form";

export const WaybillBody = (props) => {
    const classes = props.classes;
    const content = <div style={{minWidth: 350}}>
        <WaybillForm/>
    </div>

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