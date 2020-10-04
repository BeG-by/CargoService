import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    mainParagraph: {
        fontSize: "22px",
        paddingTop: "20px",
    },
    backgroundImg: {
        background: "url(resources/images/welcome.jpg) no-repeat fixed"
    }

}));

export const WelcomeBody = () => {
    const classes = useStyles();

    return (
        <main className="text-body welcome-body main-body-field">
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
        </main>
    );
}

export default WelcomeBody;