import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    footerCopyright: {
        fontSize: '16px',
        color: 'white',
        paddingTop: '15px',
        textAlign: 'right',
        textDecoration: 'underline',
        marginRight: "20px"
    }
}));

export function Copyright() {
    const classes = useStyles();
    return (
        <Typography variant="body2" className={classes.footerCopyright}>
            <Link color="inherit" href="https://www.itechart.by/" target="_blank">
                {'Copyright © iTechArt  '}
                {new Date().getFullYear()}
            </Link>{' '}
        </Typography>
    );
}