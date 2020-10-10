import * as Yup from "yup";

export const ProductFormValidationSchema = Yup.object({
    name: Yup.string()
        .required("Name is required")
        .min(2, "Name length must be greater than 2 symbols")
        .max(24, "Name length must be lesser than 24 symbols")
        .matches(/^[-A-Яа-яA-Za-z\s0-9,.]+$/, "Street must contain symbols A-Z, a-z, А-Я, а-я, 0-9, (,.-)"),
    quantity: Yup.string()
        .required("Quantity is required")
        .max(16, "Quantity length must be lesser than 16 symbols")
        .matches(/^\d+$/, "Quantity  must contain only digits"),
    price: Yup.string()
        .required("Quantity is required")
        .max(16, "Quantity length must be lesser than 16 symbols")
        .matches(/^[0-9]+(\.[0-9]+)?$/, "Price must be number"),
    mass: Yup.string()
        .required("Mass is required")
        .max(16, "Mass length must be lesser than 16 symbols")
        .matches(/^[0-9]+(\.[0-9]+)?$/, "Mass must be number")
});
