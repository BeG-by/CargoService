import React from "react";
import clsx from "clsx";
import ReturnButton from "../../parts/buttons/return-button";
import {SubmitButton} from "../../parts/buttons/submit-button";

export const DeliveryNoteBody = (props) => {
    const classes = props.classes;
    let number = localStorage.getItem('number');
    let status = localStorage.getItem('status');
    let button;
    let style;
    if (status.trim() === 'registered') {
        button = <div>
            <SubmitButton listener={false} buttonText={'Verify note'}/>
        </div>
        style = 'btn-row';
    } else {
        style = 'btn'
    }
    const content = <div>
        <h2>Here is your delivery note {number}</h2>
        <div className={style}>
            {button} <ReturnButton buttonText="To Main Page" returnHandler="BackToMain"/>
        </div>
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