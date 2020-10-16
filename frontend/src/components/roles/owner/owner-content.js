import React, {useState} from "react";
import {Form, Formik} from "formik";
import Paper from "@material-ui/core/Paper";
import DatePickerField from "../../parts/layout/date-picker";
import {Button} from "@material-ui/core";
import useToast from "../../parts/toast-notification/useToast";
import {DataFormValidation} from "../../parts/validation/data-form-validation";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as XLSX from "xlsx";
import * as FileSaver from 'file-saver';
import {ProfitChart} from "./profit-chart";
import {handleRequestError, makeRequest, STATS_URL} from "../../parts/util/request-util"


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


const EMPTY_DATA = {
    startDate: "2020-09-13",
    profits: [313, 456, 403, 391],
    losses: [233, 300, 303, 350],
};

export const OwnerContent = () => {
    const styles = useStyles();
    const [toastComponent, openToast] = useToast();
    const [button, setButton] = useState("");
    const [chartData, setChartData] = useState(EMPTY_DATA);

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
        openToast("Report is creating...", "info");
    };


    const handleSubmit = async (values) => {

        let url = `${STATS_URL}?start=${values.startDate}&end=${values.endDate}`;

        if (button === "report") {

            makeRequest("GET", url)
                .then(res => {

                        let fileName = "report_" + values.startDate + "_" + values.endDate + " " + Date.now();
                        const data = res.data;
                        let totalProfit = 0;
                        let totalLoss = 0;

                        for (let i = 0; i < data.length; i++) {
                            totalProfit = totalProfit + Number(data[i].profit);
                            totalLoss = totalLoss + Number(data[i].losses);
                        }

                        let total = totalProfit - totalLoss;
                        data[0].totalProfit = totalProfit;
                        data[0].totalLoss = totalLoss;
                        data[0].total = total;
                        exportToCSV(data, fileName);
                    }
                )
                .catch(error => handleRequestError(error, openToast))


        } else {

            makeRequest("GET", url)
                .then(res => {
                        setChartData(transformDataToChartData(res.data));
                    }
                )
                .catch(error => handleRequestError(error, openToast))
        }

    };


    const transformDataToChartData = (data) => {

        const dataForChart = {
            startDate: getStartDate(data),
            profits: [],
            losses: []
        };

        data.forEach(item => {
            dataForChart.profits.push(Number(item.profit));
            dataForChart.losses.push(Number(item.losses));
        });

        return dataForChart;

    };


    const getStartDate = (data) => {

        let min = new Date(2050, 0, 1);

        for (let i = 0; i < data.length; i++) {
            let arr = data[i].date.split("-");
            if (new Date(arr[0], arr[1], arr[2]).getTime() < min.getTime()) {
                min = new Date(arr[0], arr[1], arr[2]);
            }
        }

        return min.getFullYear() + "-" + (min.getMonth() - 1) + "-" + min.getDate();

    };


    let date = new Date();
    let today = date.toISOString().substring(0, date.toISOString().indexOf("T"));

    return (
        <main className="main-body-without-back">
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
                        {toastComponent}
                    </React.Fragment>

                    <Paper className={`table-paper`}
                           style={{
                               padding: 20,
                               width: "50%"
                           }}>
                        <ProfitChart
                            dataProps={chartData}
                        />
                        <div>

                        </div>
                    </Paper>
                </div>
            </div>
        </main>
    )
};

export default OwnerContent;