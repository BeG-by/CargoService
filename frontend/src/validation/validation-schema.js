import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object({
    username: Yup.string()
        .min(4, "login is too short")
        .max(16, "login is too long")
        .required("login is required"),
    password: Yup.string()
        .min(4, "password is too short")
        .max(16, "password is too long")
        .required("password is required"),

});

export const validationSchemaWaybill = Yup.object({
    departure_date: Yup.date()
        .default(function() {
        return new Date();
    }),
    arrival_date: Yup.date()
        .min(Yup.ref('departure_date'),
            'Arrival date should be equal or greater than departure date')
        .default(function() {
            return new Date();
        })
});