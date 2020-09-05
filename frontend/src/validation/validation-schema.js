import * as Yup from 'yup';

export const validationSchema = Yup.object({
    username: Yup.string()
        .min(4, "login is too short")
        .max(16, "login is too long")
        .required("login is required"),
    password: Yup.string()
        .min(4, "password is too short")
        .max(16, "password is too long")
        .required("password is required"),

});