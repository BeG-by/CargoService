import React, {useState} from "react";
import {Form, Formik} from "formik";
import Paper from "@material-ui/core/Paper";
import DatePickerField from "../../parts/layout/date-picker";
import {Button} from "@material-ui/core";
import {makeRequest} from "../../parts/util/request-util";
import useToast from "../../parts/toast-notification/useToast";
import {DataFormValidation} from "../../parts/validation/data-form-validation";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    infoPiece: {
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 30,
    },
    btnSubmit: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
    }
}));

export const OwnerContent = () => {
    const styles = useStyles();
    const [ToastComponent, openToast] = useToast();
    const [button, setButton] = useState("");

    //TODO
    const handleSubmit = async (values) => {

        // if (button === "report") {
        //     let url = `${REPORT_URL}?startDate=${values.startDate}&endDate=${values.endDate}`;
        //     await makeRequest("GET", url).then(
        //         () => {
        //             //todo create report on backend
        //             openToast("Report has been created", "info");
        //         },
        //         () => {
        //             openToast("Report creating failed", "error");
        //         }
        //     );
        // } else {
        //     let url = `${DIAGRAM_URL}?startDate=${values.startDate}&endDate=${values.endDate}`;
        //     await makeRequest("GET", url).then(
        //         () => {
        //             //todo show diagram
        //         },
        //         () => {
        //             openToast("Diagram creating failed", "error");
        //         }
        //     );
        // }

    };

    let date = new Date();
    let today = date.toISOString().substring(0, date.toISOString().indexOf("T"));

    return (
        <main className="main-body-field">
            <div className="info-content">
                <div className="info-content-column">
                    <React.Fragment>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                startDate: today,
                                endDate: today,
                            }}
                            validationSchema={DataFormValidation}
                            onSubmit={handleSubmit}>
                            {(formProps) => (
                                <Form>
                                    <div className="info-content">
                                        <div className="info-content-column">
                                            <Paper className={`${styles.infoPiece} table-paper`}>
                                                <h2 style={{color: "#3f51b5"}}>Profit and loss data</h2>
                                                <h4>Select period you need</h4>

                                                <DatePickerField
                                                    formikProps={formProps}
                                                    id="startDate"
                                                    formikFieldName="startDate"
                                                    label="From"
                                                />

                                                <DatePickerField
                                                    formikProps={formProps}
                                                    id="endDate"
                                                    formikFieldName="endDate"
                                                    label="To"
                                                />

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={() => {
                                                        setButton("report");
                                                    }}
                                                    className={styles.btnSubmit}
                                                >
                                                    Create report
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={() => {
                                                        setButton("diagram");
                                                    }}
                                                    className={styles.btnSubmit}
                                                >
                                                    Show diagram
                                                </Button>

                                            </Paper>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        {ToastComponent}
                    </React.Fragment>

                    <Paper className={`table-paper`}
                           style={{
                               padding: 20,
                               width: "50%"
                           }}>
                        Here is your very informative chart (or two)
                    </Paper>
                </div>
            </div>
        </main>
    )
};

export default OwnerContent;