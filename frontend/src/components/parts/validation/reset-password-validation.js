import * as Yup from "yup";

export const ResetPasswordScheme = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .min(4, "Min length must be greater than 4 symbols")
        .max(16, "Max length must be lesser than 16 symbols"),
    confirm: Yup.string()
        .required("Password is required")
        .min(4, "Min length must be greater than 4 symbols")
        .max(16, "Max length must be lesser than 16 symbols")
});