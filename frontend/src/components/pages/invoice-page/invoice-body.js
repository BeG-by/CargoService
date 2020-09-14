import React, {useEffect} from "react";
import clsx from "clsx";
import ReturnButton from "../../parts/buttons/return-button";
import {OkButton} from "../../parts/buttons/ok-button";
import {DialogWindow} from "../../parts/dialog";
import {AssignVerificationInvoice, RejectVerificationInvoice} from "../../parts/dialogs/verify-invoice";
import {getInvoiceById} from "../../parts/invoices-table-and-form/request-utils";

export const InvoiceBody = (props) => {
    const classes = props.classes;
    const [form, setForm] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [invoice, setInvoice] = React.useState({id: props.id});

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleVerifyOpen = () => {
        const form = <AssignVerificationInvoice handleClose={handleClose} invoice={invoice}/>
        setForm(form);
        setOpenDialog(true);
    }

    const handleRejectOpen = () => {
        const form = <RejectVerificationInvoice handleClose={handleClose} invoice={invoice}/>
        setForm(form);
        setOpenDialog(true);
    }

    async function fetchInvoice(id) {
        setInvoice(await getInvoiceById(id));
    }

    useEffect(() => {
        fetchInvoice(invoice.id);
    }, null);

    let status = invoice.status;
    let buttonVerify;
    let buttonReject;
    let style;

    if (status.trim() === 'REGISTERED') {
        buttonVerify = <OkButton content={'Verify invoice'} handleClick={handleVerifyOpen}/>
        buttonReject = <OkButton content={'Reject invoice'} handleClick={handleRejectOpen}/>
        style = 'btn-row';
    } else {
        style = 'btn'
    }

    const content = <div>
        Invoice fields
        <div className={style}>
            {buttonVerify}
            {buttonReject}
            <ReturnButton buttonText="Main Page" returnHandler="BackToMain"/>
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