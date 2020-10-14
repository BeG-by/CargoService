import * as Yup from "yup";

export const LinkScheme = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .max(24, "Max length must be lesser than 24 symbols")
        .email("Email is invalid"),
    role: Yup.string()
        .required("Role is required"),

});