import * as Yup from "yup";

export const ClientFormValidationSchema = Yup.object({
    name: Yup.string().max(64, "Name is too long").required("Name is required"),
    payerAccountNumber: Yup.string()
        .max(9, "Payer account number must be 9 symbols")
        .required("Payer account number is required"),
    country: Yup.string()
        .max(64, "Country is too long (max is 64)")
        .required("Country is required"),
    city: Yup.string()
        .max(64, "City is too long (max is 64)")
        .required("City is required"),
    street: Yup.string()
        .max(64, "Street is too long (max is 64)")
        .required("Street is required"),
    house: Yup.string()
        .max(64, "House is too long (max is 64)")
        .required("House is required"),
    email: Yup.string().email().required("Email is required"),
    flat: Yup.string()
        .max(64, "Flat is too long (max is 64)")
        .required("Flat is required"),
    registrationDate: Yup.date().min("2020-01-01", "Min date is 2020-01-01"),
});
