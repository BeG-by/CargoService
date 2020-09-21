import * as Yup from "yup";

let dateNow =  new Date().toISOString().slice(0 , 10);

export const WaybillFormValidation = Yup.object({
    departureDate: Yup.date()
        .required("Departure date is required")
        .min(dateNow, "Min departure date is today date"),
    arrivalDate: Yup.date()
        .required("Arrival date is required")
        .min(dateNow, "Min departure date is today date") //fixme date
});