import React from "react";
import clsx from "clsx";

//todo content
export const ContactsBody = (props) => {
    const classes = props.classes;
    const content = <h2>
        Here are our contacts: ...
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