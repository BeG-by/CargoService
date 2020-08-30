import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

//fixme исправить содержимое тела главной страницы
export const MainBody = (props) => {
    const classes = props.classes;
    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: props.openMenu,
            })}
        >
            <div className={classes.drawerHeader}/>
            <div className={classes.mainField}>
                <Typography
                    className={classes.mainParagraph}
                    paragraph>WELCOME TO CARGO MANAGER!
                </Typography>
            </div>
        </main>
    );
}