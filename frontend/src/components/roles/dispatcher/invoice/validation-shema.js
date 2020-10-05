import * as Yup from "yup";

export const InvoiceFormValidation = Yup.object({
  invoiceNumber: Yup.string()
      .max(64, "Invoice number is too long")
      .required("Invoice number is required")
});
