import * as Yup from "yup";

export const InvoiceFormValidation = Yup.object({
  invoiceNumber: Yup.string()
      .required("Invoice number is required")
      .max(24, "Invoice number length must be lesser than 24 symbols")
      .matches(/^[-A-Яа-яA-Za-z0-9]+$/, "Invoice number must contain symbols A-Z, a-z, А-Я, а-я, 0-9, (-)")
});
