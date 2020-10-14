import * as Yup from 'yup';

export const ValidationSchemaEmail = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .max(64, "Email length must be lesser than 64 symbols")
        .email("Email is invalid"),
});

export const ValidationSchemaPassword = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password length must be greater than 4 symbols")
        .max(16, "Password length must be lesser than 16 symbols"),
});