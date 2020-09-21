import * as Yup from "yup";

export const InvoiceFormValidation = Yup.object({
  invoiceNumber: Yup.string()
    .max(64, "Invoice number is too long")
    .required("Invoice number is required"),
  shipper: Yup.string()
    .max(64, "Shipper is too long")
    .required("Shipper is required"),
  consignee: Yup.string()
    .max(64, "Consignee is too long")
    .required("Consignee is required"),
});
