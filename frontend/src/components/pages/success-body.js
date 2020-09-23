import React from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";

export const SuccessBody = withRouter((props) => {
    const classes = props.classes;
    const content = <div>
        <h2>
            Operation completed successfully!
        </h2>
        <Button variant="contained"
                color="primary"
                disabled={false}
                onClick={props.history.goBack}>
            Go back
        </Button>
    </div>;

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
})