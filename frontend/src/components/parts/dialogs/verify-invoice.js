import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelButton} from "../buttons/cancel-button";
import {updateInvoiceStatus} from "../../roles/manager/request-utils";
import {withRouter} from "react-router-dom";
import {Form, Formik} from "formik";
import Button from "@material-ui/core/Button";
import {RejectInvoiceValidation} from "../validation/reject-invoice-validation";
import {FillWaybillDialog} from "./fill-waybill";
import WaybillDialog from "../../roles/manager/waybill-dialog";
import {DialogWindow} from "./dialog";
import {FormikTextArea} from "../util/formik-field";

export const AssignVerificationInvoice = withRouter((props) => {
    const [selectedInvoice, setSelectedInvoice] = React.useState({});
    const [form, setForm] = React.useState(null);
    const [waybillFillDialogOpen, setWaybillFillDialogOpen] = React.useState(false);
    const [waybillDialogOpen, setWaybillDialogOpen] = React.useState(false);

    const handleClose = () => {
        props.onClose();
    }

    const handleAssign = () => {
        props.onAssign();
    }

    const handleWaybillFill = () => {
        setSelectedInvoice(props.invoice);
        setForm(FillWaybillDialog(handleWaybillFormOpen, handleAssign));
        setWaybillFillDialogOpen(true);
    }

    const handleWaybillFormOpen = () => {
        setWaybillFillDialogOpen(false);
        setWaybillDialogOpen(true);
    };

    const handleVerify = async () => {
        const invoice = {
            id: props.invoice.id,
            status: "ACCEPTED",
            comment: "Invoice checked, errors: none"
        };
        await updateInvoiceStatus(invoice);
        handleWaybillFill();
    }

    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>Assign the invoice status as "verified"?</i>
                <div className='btn-row'>
                    <OkButton content='OK' handleClick={handleVerify}/>
                    <CancelButton content='Cancel' handleClick={handleClose}/>
                </div>
            </div>

            <WaybillDialog
                invoice={selectedInvoice}
                open={waybillDialogOpen}
                onClose={handleAssign}
                onSave={handleAssign}
            />

            <DialogWindow
                dialogTitle="Confirmation"
                handleClose={handleAssign}
                openDialog={waybillFillDialogOpen}
                form={form}
            />
        </div>
    );
})

export const RejectVerificationInvoice = withRouter((props) => {
    const handleReject = async (values) => {
        const invoice = {
            id: values.id,
            status: values.status,
            comment: values.comment
        };
        await updateInvoiceStatus(invoice);
        props.onReject()
    }

    const handleClose = () => {
        props.onClose();
    }

    const comment = <Formik
        enableReinitialize
        initialValues={{
            id: props.invoice.id,
            status: "REJECTED",
            comment: ""
        }}
        onSubmit={handleReject}
        validationSchema={RejectInvoiceValidation}
    >
        {(formProps) => (
            <Form>
                <FormikTextArea
                    formikProps={formProps}
                    id={"comment"}
                    label={"Comment"}
                    formikFieldName={"comment"}
                    multiline
                    variant="outlined"
                />
                <div className="btn-row">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Reject
                    </Button>
                    <Button
                        variant="contained"
                        color='secondary'
                        onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </Form>
        )}
    </Formik>;

    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>Reject the incorrect invoice?</i>
                {comment}
            </div>
        </div>);
})


