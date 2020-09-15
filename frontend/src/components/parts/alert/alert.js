import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SimpleAlerts({type}, {message}) {
    const classes = useStyles();

    switch (type) {
        case "success":
            return (
                <div className={classes.root}>
                    <Alert severity="success">{message}</Alert>
                </div>
            );
        case "error":
            return (
                <div className={classes.root}>
                    <Alert severity="error">{message}</Alert>
                </div>
            );
        case "warning":
            return (
                <div className={classes.root}>
                    <Alert severity="warning">{message}</Alert>
                </div>
            );
        case "info":
            return (
                <div className={classes.root}>
                    <Alert severity="info">{message}</Alert>
                </div>
            );
    }

}
