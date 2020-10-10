import * as Yup from "yup";

export const StorageScheme = Yup.object({
    country: Yup.string()
        .required("Country is required")
        .min(2, "Country length must be greater than 2 symbols")
        .max(24, "Country length must be lesser than 24 symbols")
        .matches(/^[A-Яа-яA-Za-z\s]+$/, "Country must contain symbols A-Z, a-z, А-Я, а-я"),
    city: Yup.string()
        .required("City is required")
        .min(2, "City length must be greater than 2 symbols")
        .max(24, "City length must be lesser than 24 symbols")
        .matches(/^[A-Яа-яA-Za-z\s]+$/, "City must contain symbols A-Z, a-z, А-Я, а-я"),
    street: Yup.string()
        .required("Street is required")
        .min(2, "Street length must be greater than 2 symbols")
        .max(24, "Street length must be lesser than 24 symbols")
        .matches(/^[-A-Яа-яA-Za-z\s0-9,.]+$/, "Street must contain symbols A-Z, a-z, А-Я, а-я, 0-9, (,.-)"),
    house: Yup.string()
        .required("House is required")
        .max(6, "House length must be lesser than 6 symbols")
        .matches(/^[A-Яа-яA-Za-z0-9]+$/, "House must contain symbols A-Z, a-z, А-Я, а-я, 0-9"),
    email: Yup.string()
        .required("Email is required")
        .max(24, "Max length must be lesser than 24 symbols")
        .email("Email is invalid"),
    phone: Yup.string()
        .required("Phone is required")
        .min(5, "Min length must be greater than 5 symbols")
        .max(16, "Max length must be lesser than 16 symbols")
        .matches(/^\+?\d+$/, "Phone must contain only digits")
});