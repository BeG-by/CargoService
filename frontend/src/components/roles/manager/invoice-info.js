import React, {useEffect} from "react";
import {OkButton} from "../../parts/buttons/ok-button";
import {DialogWindow} from "../../parts/dialogs/dialog";
import {CloseInvoice, RejectVerificationInvoice} from "../../parts/dialogs/verify-invoice";
import AssignVerificationInvoice from "../../parts/dialogs/verify-invoice";
import {getInvoiceById} from "./request-utils";
import InvoiceInfoContent from "./invoice-info-content";
import {getWaybillById} from "../driver/request-utils";

export const InvoiceInfo = (props) => {
    const [form, setForm] = React.useState(null);
    const [openVerifyDialog, setOpenVerifyDialog] = React.useState(false);
    const [openRejectDialog, setOpenRejectDialog] = React.useState(false);
    const [invoice, setInvoice] = React.useState({
        id: 0,
        invoiceStatus: "",
        products: [],
        number: "",
        registrationDate: "",
        checkingDate: "",
        closeDate: "",
        shipper: "",
        consignee: "",
        driver: {id: 0, name: "", surname: ""},
        registrationUser: {id: 0},
        checkingUser: {id: 0},
        waybillId: "",
    });
    const [checkPassage, setCheckPassage] = React.useState(true);

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

    const handleCloseOpen = () => {
        const form = <CloseInvoice handleClose={handleClose} invoice={invoice}/>
        setForm(form);
        setOpenRejectDialog(true);
    }

    async function fetchInvoice(cleanupFunction) {
        let selected = await getInvoiceById(props.invoiceId);
        if (!cleanupFunction) setInvoice({
            id: selected.id,
            invoiceStatus: selected.invoiceStatus,
            products: selected.products,
            number: selected.number,
            registrationDate: selected.registrationDate,
            checkingDate: selected.checkingDate,
            closeDate: selected.closeDate,
            shipper: selected.shipper,
            consignee: selected.consignee,
            driver: {id: selected.driver.id, name: selected.driver.name, surname: selected.driver.surname},
            registrationUser: {
                id: selected.registrationUser.id,
                name: selected.registrationUser.name,
                surname: selected.registrationUser.surname
            },
            checkingUser: selected.checkingUser === null ? null : {
                id: selected.checkingUser.id,
                name: selected.checkingUser.name,
                surname: selected.checkingUser.surname
            },
            waybillId: selected.waybillId,
        });
        if (selected.waybillId === null) {
            setCheckPassage(false);
        } else {
            let foundWaybill = await getWaybillById(selected.waybillId);
            foundWaybill.points.forEach(p => {
                if (!p.passed) setCheckPassage(false);
            })
        }
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchInvoice(cleanupFunction);
        return () => cleanupFunction = true;
    }, []);

    let status = invoice.invoiceStatus;
    let buttonVerify;
    let buttonReject;
    let buttonClose;
    let style;

    if (status.trim() === 'REGISTERED') {
        buttonVerify = <OkButton content={'Verify'} handleClick={handleVerifyOpen}/>
        buttonReject = <OkButton content={'Reject'} handleClick={handleRejectOpen}/>
        style = 'btn-row';
    } else if (status.trim() === 'ACCEPTED' && checkPassage) {
        buttonClose = <OkButton content={'Close'} handleClick={handleCloseOpen}/>;
        style = 'btn-row';
    } else {
        style = 'btn'
    }

    let buttons = <div className={style}>
        {buttonVerify}
        {buttonReject}
        {buttonClose}
    </div>

    const content = <div>
        <InvoiceInfoContent invoice={invoice} buttons={buttons}/>
    </div>

    return (
        <div>
            {content}
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