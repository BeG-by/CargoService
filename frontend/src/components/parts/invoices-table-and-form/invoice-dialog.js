import React from "react";
import InvoiceForm from "../../forms/invoice-form/invoice-creating-form";

export default function InvoiceDialog(props) {

    return (
        <InvoiceForm open={props.open}
                     invoice={props.invoice}
                     onDelete={props.onDelete}
                     onClose={props.onClose}
                     onSubmit={props.onSubmit}/>
    );

}