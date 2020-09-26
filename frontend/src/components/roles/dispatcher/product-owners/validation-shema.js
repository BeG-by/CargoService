import * as Yup from "yup";

export const ProductFormValidationSchema = Yup.object({
        name: Yup.string().max(64, "Name is too long").required("Name is required"),
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
        registrationDate: Yup.date().min(new Date().toISOString().slice(0, 10), "Min date is " +
            new Date().toISOString().slice(0, 10)),
        phone: Yup.number
        ().required("Phone is required")
    })
;
