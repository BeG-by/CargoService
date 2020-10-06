import React, {useEffect} from "react";
import {OkButton} from "../../parts/buttons/ok-button";
import {DialogWindow} from "../../parts/dialogs/dialog";
import {RejectVerificationInvoice} from "../../parts/dialogs/verify-invoice";
import {AssignVerificationInvoice} from "../../parts/dialogs/verify-invoice";
import {getInvoiceById} from "./request-utils";
import InvoiceInfoContent from "./invoice-info-content";
import {CloseInvoice} from "../../parts/dialogs/close-invoice";
import {connect} from "react-redux";
import {EditInvoice} from "../../parts/dialogs/edit-invoice";

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
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [invoice, setInvoice] = React.useState({
        id: 0,
        status: "",
        products: [],
        number: "",
        registrationDate: "",
        checkingDate: "",
        closeDate: "",
        shipper: {address:{}},
        consignee: {address: {}},
        driver: {id: 0, name: "", surname: ""},
        registrationUser: {id: 0},
        checkingUser: {id: 0},
        comment: "",
        waybill: {},
        act: {},
        productOwnerDTO: {}
    });
    const [checkPassage, setCheckPassage] = React.useState(true);

    const handleClose = () => {
        setOpenVerifyDialog(false);
        setOpenRejectDialog(false);
        setOpenCloseDialog(false);
        setOpenEditDialog(false);
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

    const handleEditOpen = () => {
        const form = <EditInvoice handleClose={handleClose} invoice={invoice}/>
        setForm(form);
        setOpenEditDialog(true);
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
            driver: selected.driver,
            registrationUser: selected.registrationUser,
            checkingUser: selected.checkingUser,
            waybill: selected.waybill,
            act: selected.act,
            comment: selected.comment,
            productOwnerDTO: selected.productOwnerDTO,
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
    let editDisabled = false;

    if (status.trim() === 'REGISTERED' && props.role === "MANAGER") {
        closeDisabled = true;
        editDisabled = true;
    } else if (status.trim() === 'ACCEPTED' && checkPassage && props.role === "DRIVER") {
        verifyDisabled = true;
        rejectDisabled = true;
        editDisabled = true;
    } else if (status.trim() === 'REJECTED' && props.role === "DISPATCHER") {
        verifyDisabled = true;
        rejectDisabled = true;
        closeDisabled = true;
    } else {
        verifyDisabled = true;
        rejectDisabled = true;
        closeDisabled = true;
        editDisabled = true;
    }

    let buttons = <div className='btn-row'>
        <OkButton content={'Verify'} handleClick={handleVerifyOpen} disabled={verifyDisabled}/>
        <OkButton content={'Reject'} handleClick={handleRejectOpen} disabled={rejectDisabled}/>
        <OkButton content={'Close'} handleClick={handleCloseOpen} disabled={closeDisabled}/>
        <OkButton content={'Edit'} handleClick={handleCloseOpen} disabled={editDisabled}/>
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
            <DialogWindow
                dialogTitle="Editing"
                handleClose={handleClose}
                openDialog={openEditDialog}
                form={form}/>
        </div>
    );
})