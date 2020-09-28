import React from "react";
import { ErrorMessage } from "formik";
import DateFnsUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

export default function CustomDatePicker(props) {
    const { formikProps, formikFieldName, id, label } = props;

    return (
        <React.Fragment>
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        margin="normal"
                        id={id}
                        label={label}
                        format="YYYY-MM-DD"
                        value={formikProps.values[formikFieldName]}
                        onChange={(date) => {
                            if (date !== null && date !== undefined && date.isValid()) {
                                formikProps.setFieldValue(
                                    formikFieldName,
                                    date.format("YYYY-MM-DD"),
                                    true
                                );
                            }
                        }}
                        fullWidth
                    />
                </MuiPickersUtilsProvider>
            </div>
            <label style={{ color: "#f50057" }}>
                <ErrorMessage name={"date"} />
            </label>
        </React.Fragment>
    );
}
