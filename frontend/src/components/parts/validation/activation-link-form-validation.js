import * as Yup from "yup";

export const LinkScheme = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .max(64, "Max length must be lesser than 64 symbols")
        .email("Email is invalid"),
    role: Yup.string()
        .required("Role is required"),

});