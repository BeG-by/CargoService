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
                return moment(value, "yyyy-MM-DD").isAfter(moment(initDate, "yyyy-MM-DD"))
            }
        ),
    departureDate: Yup.string()
        .test(
            'test3',
            'Date must be equal or greater than today',
            function (value) {
                let date = new Date();
                let initDate = date.toISOString().substring(0, date.toISOString().indexOf("T"));
                return moment(value, "yyyy-MM-DD").isAfter(moment(initDate, "yyyy-MM-DD"))
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
                return moment(value, "yyyy-MM-DD").isBefore(moment(arrivalDate, "yyyy-MM-DD"))
            }
        )
});

// departureDate: Yup.string()
//     .test(
//         'test1',
//         'Format must be yyyy-MM-DD',
//         function (value){
//             return moment(value, "yyyy-MM-DD", true).isValid()
//         }
//     )
//     .test(
//         'test2',
//         'Start date must be before end date',
//         function(value){
//             let { arrivalDate } = this.parent;
//             return moment(value, "yyyy-MM-DD").isBefore(moment(arrivalDate, "yyyy-MM-DD"))
//         }
//     )