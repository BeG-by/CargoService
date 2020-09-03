import React from "react";
import clsx from "clsx";

export const InfoBody = (props) => {
    const classes = props.classes;
    const content = <h3>
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
        Very interesting info about application which is full of eternal shine and marvelous glory etc.
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