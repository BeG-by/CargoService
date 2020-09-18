import * as Yup from "yup";

export const WaybillFormValidation = Yup.object({
    departureDate: Yup.date()
        .required("Departure date is required")
        .min("2020-09-12", "Min departure date is today date"),
    arrivalDate: Yup.date()
        .required("Arrival date is required")
        .min("2020-09-12", "Min departure date is today date") //fixme date
});