import * as Yup from 'yup';

export const validationSchema = Yup.object({
    username: Yup.string()
        .max(16, "login is too long")
        .required("login is required"),
    password: Yup.string()
        .max(16, "password is too long")
        .required("password is required")
});