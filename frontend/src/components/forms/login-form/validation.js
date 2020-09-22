import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object({
    username: Yup.string()
        .min(4, "Login is too short")
        .max(16, "Login is too long")
        .required("Login is required"),
    password: Yup.string()
        .min(4, "Password is too short")
        .max(16, "Password is too long")
        .required("Password is required"),

});
