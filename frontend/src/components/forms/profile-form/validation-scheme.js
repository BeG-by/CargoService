import * as Yup from 'yup';

export const PhoneScheme = Yup.object({
    phone: Yup.string()
        .required("Phone is required")
        .min(5, "Min length must be greater than 5 symbols")
        .max(16, "Max length must be lesser than 16 symbols")
        .matches(/^\+?\d+$/, "Phone must contain only digits")
});


export const PasswordScheme = Yup.object({
    oldPassword: Yup.string()
        .required("Old password is required")
        .min(4, "Min length must be greater than 4 symbols")
        .max(16, "Max length must be lesser than 16 symbols"),
    newPassword: Yup.string()
        .required("New password is required")
        .min(4, "Min length must be greater than 4 symbols")
        .max(16, "Max length must be lesser than 16 symbols"),
    confirmNewPassword: Yup.string()
        .required("Confirm new password")
        .min(4, "Min length must be greater than 4 symbols")
        .max(16, "Max length must be lesser than 16 symbols"),
});