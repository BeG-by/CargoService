import React from "react";
import clsx from "clsx";

export const InfoBody = (props) => {
    const classes = props.classes;
    const content = <h2> //todo
        Very interesting and useful information about the application, it's full of eternal shine
        and marvelous glory, splendid facts and high definition photos of little fluffy puppies, blah-blah-blah...
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