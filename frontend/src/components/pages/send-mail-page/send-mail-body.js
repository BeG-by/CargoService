import React from "react";
import clsx from "clsx";

//todo inner content
export const SendMailBody = (props) => {
    const classes = props.classes;
    const content = <h2>
        Here you can send message to iTechArt support team.
    </h2>;

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