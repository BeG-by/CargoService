import React from "react";
import clsx from "clsx";
import ReturnButton from "../../parts/buttons/return-button";
import {OkButton} from "../../parts/buttons/ok-button";
import {DialogWindow} from "../../parts/dialog";
import {AssignVerificationInvoice} from "../../parts/dialogs/verify-invoice";

export const InvoiceBody = (props) => {
    const classes = props.classes;
    const [form, setForm] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleClickOpen = () => {
        const form = <AssignVerificationInvoice handleClose={handleClose}/>
        setForm(form);
        setOpenDialog(true);
    }

    let number = localStorage.getItem('number');
    // let status = localStorage.getItem('status');
    let status = "registered";
    let button;
    let style;

    if (status.trim() === 'registered') {
        button = <OkButton content={'Verify invoice'} handleClick={handleClickOpen}/>
        style = 'btn-row';
    } else {
        style = 'btn'
    }

    const content = <div>
        <h2>Here is your invoice {number}</h2>
        <div className={style}>
            {button} <ReturnButton buttonText="Main Page" returnHandler="BackToMain"/>
        </div>
    </div>

    return (
        <div>
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
            <DialogWindow
                dialogTitle="Confirmation"
                handleClose={handleClose}
                openDialog={openDialog}
                form={form}/>
        </div>
    );
}