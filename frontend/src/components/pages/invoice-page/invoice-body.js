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
    const [openVerifyDialog, setOpenVerifyDialog] = React.useState(false);
    const [openRejectDialog, setOpenRejectDialog] = React.useState(false);
    const [invoice, setInvoice] = React.useState({id: 0, invoiceStatus: ""});

    const handleClose = () => {
        setOpenVerifyDialog(false);
        setOpenRejectDialog(false);
    };

    const handleVerifyOpen = () => {
        const form = <AssignVerificationInvoice handleClose={handleClose} invoice={invoice}/>
        setForm(form);
        setOpenVerifyDialog(true);
    }

    const handleRejectOpen = () => {
        const form = <RejectVerificationInvoice handleClose={handleClose} invoice={invoice}/>
        setForm(form);
        setOpenRejectDialog(true);
    }

    async function fetchInvoice() {
        let selected = await getInvoiceById(localStorage.getItem("invoice"));
        setInvoice({id: selected.id, invoiceStatus: selected.invoiceStatus});
    }

    useEffect(() => {
        fetchInvoice();
    });

    let status = invoice.invoiceStatus;
    let buttonVerify;
    let buttonReject;
    let style;

    if (status.trim() === 'REGISTERED') {
        buttonVerify = <OkButton content={'Verify'} handleClick={handleVerifyOpen}/>
        buttonReject = <OkButton content={'Reject'} handleClick={handleRejectOpen}/>
        style = 'btn-row';
    } else {
        style = 'btn'
    }

    //fixme сделать показ формы или просто показать инфо?
    const content = <div>
        Invoice fields for user's observing
        <div className={style}>
            {buttonVerify}
            {buttonReject}
        </div>
        <ReturnButton buttonText="Main Page" returnHandler="BackToMain"/>
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
                dialogTitle="Verification"
                handleClose={handleClose}
                openDialog={openVerifyDialog}
                form={form}/>
            <DialogWindow
                dialogTitle="Rejection"
                handleClose={handleClose}
                openDialog={openRejectDialog}
                form={form}/>
        </div>
    );
}