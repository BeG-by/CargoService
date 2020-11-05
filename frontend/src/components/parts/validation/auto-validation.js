import * as Yup from 'yup';
import moment from "moment";

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
        .max(9, "Max length must be lesser than 9 symbols")
        .matches(/^[0-9]+(\.[0-9]+)?$/, "Consumption must be number"),
    maxLoad: Yup.string()
        .required("Max load is required")
        .matches(/^[0-9]+$/, "Max load must be contain only digit"),
    dateOfIssue: Yup.string()
        .test(
            'test.js',
            'Date must be equal or before than today',
            function (value) {
                let date = new Date();
                let initDate = date.toISOString().substring(0, date.toISOString().indexOf("T"));
                return moment(value, "yyyy-MM-DD").isSameOrBefore(moment(initDate, "yyyy-MM-DD"));
            }
        )
});