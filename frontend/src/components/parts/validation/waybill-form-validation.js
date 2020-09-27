import * as Yup from "yup";
import moment from "moment";

export const WaybillFormValidation = Yup.object({
    arrivalDate: Yup.string()
        .test(
            'test1',
            'Format must be yyyy-MM-DD',
            function (value) {
                return moment(value, "yyyy-MM-DD", true).isValid()
            }
        )
        .test(
            'test2',
            'Date must be equal or greater than today',
            function (value) {
                let date = new Date();
                let initDate = date.toISOString().substring(0, date.toISOString().indexOf("T"));
                return moment(value, "yyyy-MM-DD").isSameOrAfter(moment(initDate, "yyyy-MM-DD"))
            }
        ),
    departureDate: Yup.string()
        .test(
            'test3',
            'Date must be equal or greater than today',
            function (value) {
                let date = new Date();
                let initDate = date.toISOString().substring(0, date.toISOString().indexOf("T"));
                return moment(value, "yyyy-MM-DD").isSameOrAfter(moment(initDate, "yyyy-MM-DD"))
            }
        )
        .test(
            'test4',
            'Format must be yyyy-MM-DD',
            function (value) {
                return moment(value, "yyyy-MM-DD", true).isValid()
            }
        )
        .test(
            'test5',
            'Departure date must be before arrival date',
            function (value) {
                let {arrivalDate} = this.parent;
                return moment(value, "yyyy-MM-DD").isSameOrBefore(moment(arrivalDate, "yyyy-MM-DD"))
            }
        ),
    autoId: Yup.number()
        .required("Auto is required")
        .min(1, "Auto is required"),
    points: Yup.number()
        .min(1, "Control points are required")
        .max(100, "Enough! More than 100 points! Are you crazy?")
});

export const PointFormValidation = Yup.object({
    place: Yup.string()
        .required("Place is required")
        .max(255, "Max length must be lesser than 255 symbols")
});