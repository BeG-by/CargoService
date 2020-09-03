import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

export const WelcomeBody = (props) => {
    const classes = props.classes;
    localStorage.setItem("role", "manager");//fixme удалить после авторизации
    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: props.openMenu,
            })}
        >
            <div className={classes.drawerHeader}/>
            <div className={classes.mainField}>
                <Typography
                    variant="h4"
                    style={{fontStyle: 'oblique'}}>
                    Welcome!
                </Typography>
                <Typography
                    className={classes.mainParagraph}
                    paragraph>
                    This application is ready to offer our customers easy and reliable control
                    over the movement of the necessary goods.
                </Typography>
                <Typography
                    className={classes.mainParagraph}
                    paragraph>
                    Please sign in to access all features you need.
                </Typography>
            </div>
        </main>
    );
}