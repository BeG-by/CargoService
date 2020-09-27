import {OkButton} from "../buttons/ok-button";
import React from "react";
import {CancelButton} from "../buttons/cancel-button";
import {updateInvoiceStatus} from "../../roles/manager/request-utils";
import {withRouter} from "react-router-dom";
import {Form, Formik} from "formik";
import FormikField from "../../roles/sysadmin/formik-field";
import Button from "@material-ui/core/Button";
import {RejectInvoiceValidation} from "../validation/reject-invoice-validation";

export const AssignVerificationInvoice = withRouter((props) => {
    const handleVerify = async () => {
        const invoice = {
            id: props.invoice.id,
            status: "ACCEPTED",
            comment: "Invoice checked, errors: none"
        };
        await updateInvoiceStatus(invoice);
        props.history.push("/success");
    }

    return (
        <div className="form-signin">
            <div>
                <i style={{fontSize: 16}}>Assign the status as "verified"?</i>
                <div className='btn-row'>
                    <OkButton content='OK' handleClick={handleVerify}/>
                    <CancelButton content='Cancel' handleClick={props.handleClose}/>
                </div>
            </div>
        </div>);
})

export const RejectVerificationInvoice = withRouter((props) => {
    const handleReject = async (values) => {
        const invoice = {
            id: values.id,
            status: values.status,
            comment: values.comment
        };
        await updateInvoiceStatus(invoice);
        props.history.push("/success");
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
                <FormikField
                    formikProps={formProps}
                    id={"comment"}
                    label={"Comment"}
                    formikFieldName={"comment"}
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
                        onClick={props.handleClose}>
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


