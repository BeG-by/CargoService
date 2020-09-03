import React from "react";
import clsx from "clsx";

export const SendMailBody = (props) => {
    const classes = props.classes;
    const content = <h3>
        Here you can send message to iTechArt support team.
    </h3>;

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