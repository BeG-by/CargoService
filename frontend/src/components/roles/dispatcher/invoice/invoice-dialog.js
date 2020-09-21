import React from "react";
import {Dialog} from "@material-ui/core";
import InvoiceForm from "./invoice-form";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles";

export default function InvoiceDialog(props) {
    const classes = useStyles();
    const {open, onClose, productOwner, invoiceId} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Invoice registration
                    </Typography>
                </Toolbar>
            </AppBar>
            <InvoiceForm
                productOwner={productOwner}
                invoiceId={invoiceId}
                onClose={handleClose}
            />
        </Dialog>
    );
};
