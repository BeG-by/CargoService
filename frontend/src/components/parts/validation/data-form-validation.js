import * as Yup from "yup";
import moment from "moment";

export const DataFormValidation = Yup.object({
    startDate: Yup.string()
        .test(
            'test1',
            'Format must be yyyy-MM-DD',
            function (value) {
                return moment(value, "yyyy-MM-DD", true).isValid()
            }
        )
        .test(
            'test2',
            'Date must be equal or lesser than today',
            function (value) {
                let date = new Date();
                let initDate = date.toISOString().substring(0, date.toISOString().indexOf("T"));
                return moment(value, "yyyy-MM-DD").isSameOrBefore(moment(initDate, "yyyy-MM-DD"))
            }
        ),
    endDate: Yup.string()
        .test(
            'test3',
            'Date must be equal or lesser than today',
            function (value) {
                let date = new Date();
                let initDate = date.toISOString().substring(0, date.toISOString().indexOf("T"));
                return moment(value, "yyyy-MM-DD").isSameOrBefore(moment(initDate, "yyyy-MM-DD"))
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
            'Start date must be before end date',
            function (value) {
                let {startDate} = this.parent;
                return moment(value, "yyyy-MM-DD").isSameOrAfter(moment(startDate, "yyyy-MM-DD"))
            }
        ),
});