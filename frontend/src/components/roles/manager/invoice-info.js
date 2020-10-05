import React, {useEffect} from "react";
import {OkButton} from "../../parts/buttons/ok-button";
import {DialogWindow} from "../../parts/dialogs/dialog";
import {RejectVerificationInvoice} from "../../parts/dialogs/verify-invoice";
import {AssignVerificationInvoice} from "../../parts/dialogs/verify-invoice";
import {getInvoiceById} from "./request-utils";
import InvoiceInfoContent from "./invoice-info-content";
import {CloseInvoice} from "../../parts/dialogs/close-invoice";
import {connect} from "react-redux";

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const InvoiceInfo = connect(mapStateToProps)((props) => {
    const [form, setForm] = React.useState(null);
    const [openVerifyDialog, setOpenVerifyDialog] = React.useState(false);
    const [openRejectDialog, setOpenRejectDialog] = React.useState(false);
    const [openCloseDialog, setOpenCloseDialog] = React.useState(false);
    const [invoice, setInvoice] = React.useState({
        id: 0,
        status: "",
        products: [],
        number: "",
        registrationDate: "",
        checkingDate: "",
        closeDate: "",
        shipper: {address:{}},
        consignee: {address:{}},
        driver: {id: 0, name: "", surname: ""},
        registrationUser: {id: 0},
        checkingUser: {id: 0},
        waybill: null,
        act: null,
    });
    const [checkPassage, setCheckPassage] = React.useState(true);

    const handleClose = () => {
        setOpenVerifyDialog(false);
        setOpenRejectDialog(false);
        setOpenCloseDialog(false);
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
        setOpenCloseDialog(true);
    }

    async function fetchInvoice(cleanupFunction) {
        let selected = await getInvoiceById(props.invoiceId);
        if (!cleanupFunction) setInvoice({
            id: selected.id,
            status: selected.status,
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
            waybill: selected.waybill,
            act: selected.act,
            comment: selected.comment,
        });
        if (selected.waybill === null) {
            setCheckPassage(false);
        } else {
            selected.waybill.points.forEach(p => {
                if (!p.passed) setCheckPassage(false);
            })
        }
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchInvoice(cleanupFunction);
        return () => cleanupFunction = true;
    }, []);

    let status = invoice.status;
    let verifyDisabled = false;
    let rejectDisabled = false;
    let closeDisabled = false;

    if (status.trim() === 'REGISTERED' && props.role === "MANAGER") {
        closeDisabled = true;
    } else if (status.trim() === 'ACCEPTED' && checkPassage && props.role === "DRIVER") {
        verifyDisabled = true;
        rejectDisabled = true;
    } else if (status.trim() === 'REJECTED' && props.role === "DISPATCHER") {
        verifyDisabled = true;
        rejectDisabled = true;
        closeDisabled = true;
    } else {
        verifyDisabled = true;
        rejectDisabled = true;
        closeDisabled = true;
    }

    let buttons = <div className='btn-row'>
        <OkButton content={'Verify'} handleClick={handleVerifyOpen} disabled={verifyDisabled}/>
        <OkButton content={'Reject'} handleClick={handleRejectOpen} disabled={rejectDisabled}/>
        <OkButton content={'Close'} handleClick={handleCloseOpen} disabled={closeDisabled}/>
    </div>

    return (
        <div>
            <InvoiceInfoContent invoice={invoice} buttons={buttons}/>
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
            <DialogWindow
                dialogTitle="Closing"
                handleClose={handleClose}
                openDialog={openCloseDialog}
                form={form}/>
        </div>
    );
})