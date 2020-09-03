import React from "react";
import clsx from "clsx";
import ReturnButton from "../../parts/buttons/return-button";

export const WaybillBody = (props) => {
    const classes = props.classes;
    let waybill = localStorage.getItem('waybill');

    const content = <div>
        <h2>Here is your waybill {waybill}</h2>
        <ReturnButton buttonText="To Main Page" returnHandler="BackToMain"/>
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