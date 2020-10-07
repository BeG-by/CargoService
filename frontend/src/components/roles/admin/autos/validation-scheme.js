import * as Yup from 'yup';

export const AutoScheme = Yup.object({
    mark: Yup.string()
        .required("Mark is required")
        .min(2, "Min length must be greater than 2 symbols")
        .max(42, "Max length must be lesser than 42 symbols")
        .matches(/^[0-9A-Za-z\-]+$/, "Mark must contain symbols A-Z, a-z, 0-9, (-)"),
    number: Yup.string()
        .required("Number is required")
        .min(2, "Min length must be greater than 2 symbols")
        .max(24, "Max length must be lesser than 24 symbols")
        .matches(/^[0-9A-Za-z\-]+$/, "Number must contain symbols A-Z, a-z, 0-9, (-)"),
    autoType: Yup.string()
        .required("Auto type is required"),
    consumption: Yup.string()
        .required("Consumption is required")
        .matches(/^[0-9]+(\.[0-9]+)?$/, "Consumption must be number"),
    maxLoad: Yup.string()
        .required("Max load is required")
        .matches(/^[0-9]+$/, "Max load must be contain only digit"),

});