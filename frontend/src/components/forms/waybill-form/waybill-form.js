import React, {useEffect, useState} from "react";
import PointsDialog from "./points-dialog";
import PointsTable from "./points-table";
import {Formik, Form, ErrorMessage} from "formik";
import {Button} from "@material-ui/core";
import {getAllAutos, saveWaybill} from "../../roles/manager/request-utils";
import {WaybillFormValidation} from "../../parts/validation/waybill-form-validation";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DatePickerField from "../../parts/layout/date-picker";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const EMPTY_AUTO = {
    id: 0,
    mark: "",
    autoType: "",
};

const EMPTY_POINT = {
    id: null,
    idx: -1,
    waybillId: "",
    place: "",
    passed: false,
    passageDate: "",
};

export default (props) => {
    const [invoice, setInvoice] = useState(props.invoice);
    const [selectedAuto, setSelectedAuto] = useState(EMPTY_AUTO);
    const [selectedPoint, setSelectedPoint] = useState(EMPTY_POINT);
    const [pointDialogOpen, setPointDialogOpen] = useState(false);
    const [pointIndex, setPointIndex] = useState(0);
    const [points, setPoints] = useState([]);
    const [autos, setAutos] = useState([]);
    const useStyles = makeStyles((theme) => ({
        formControl: {
            marginTop: 20,
            minWidth: "100%",
        }
    }));
    const classes = useStyles();

    useEffect(() => {
        setInvoice(props.invoice);
    }, [props.invoice]);


    async function fetchAutos(cleanupFunction) {
        if (!cleanupFunction) setAutos(await getAllAutos());
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchAutos(cleanupFunction);
        return () => cleanupFunction = true;
    }, []);

    const handleTableRowClick = (point) => {
        setSelectedPoint(point);
        setPointDialogOpen(true);
    };

    const handlePointDialogClose = () => {
        setSelectedPoint(EMPTY_POINT);
        setPointDialogOpen(false);
    };

    const handlePointDialogSubmit = (point) => {
        if (point.idx === -1) {
            addPoint(point);
        } else {
            updatePoint(point);
        }
        setSelectedPoint(EMPTY_POINT);
        setPointDialogOpen(false);
    };

    const handleCreateNewPointClick = () => {
        setSelectedPoint(EMPTY_POINT);
        setPointDialogOpen(true);
    };

    const addPoint = (point) => {
        point.idx = pointIndex;
        setPointIndex(point.idx + 1);
        setPoints((prevState) => {
            const temp = [...prevState];
            temp.push(point);
            return temp;
        });
    };

    const updatePoint = (newPoint) => {
        setPoints((prevState) => {
            const temp = [...prevState];
            for (let el of temp) {
                if (el.idx === newPoint.idx) {
                    el.waibillId = newPoint.waybillId;
                    el.passed = newPoint.passed;
                    el.place = newPoint.place;
                    el.passageDate = newPoint.passageDate;
                }
            }
            return temp;
        });
    };

    const handlePointDelete = (idx) => {
        if (idx > -1) {
            deletePointById(idx);
            handlePointDialogClose();
        }
    };

    const deletePointById = (idx) => {
        setPoints((prevState) => {
            const temp = [...prevState];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].idx === idx) {
                    temp.splice(i, 1);
                }
            }
            return temp;
        });
    };

    const handleSubmit = (values) => {
        const waybill = {};
        waybill.points = points;
        waybill.invoiceId = values.invoiceId;
        waybill.autoId = values.autoId;
        waybill.departureDate = values.departureDate;
        waybill.arrivalDate = values.arrivalDate;
        const saveWaybillRequest = async (waybill) => {
            await saveWaybill(waybill);
            props.onClose();
        };
        saveWaybillRequest(waybill);
    };

    const handleAutoChange = (event) => {
        event.preventDefault();
        setSelectedAuto({id: event.target.value, autoType: "", mark: ""});
    };

    let options = [{value: "", label: ""}];
    autos.forEach(auto => {
        let label = auto.mark + " " + auto.autoType;
        options.push({value: auto.id, label: label});
    })

    let date = new Date();
    let today = date.toISOString().substring(0, date.toISOString().indexOf("T"));

    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                initialValues={{
                    departureDate: today,
                    arrivalDate: today,
                    autoId: selectedAuto.id,
                    invoiceId: invoice.id,
                    points: points.length
                }}
                onSubmit={handleSubmit}
                validationSchema={WaybillFormValidation}
            >
                {(formProps) => (
                    <Form>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Select auto</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedAuto.id}
                                onChange={handleAutoChange}
                                name={"autoId"}
                            >
                                {options.map(option => {
                                    return (
                                        <MenuItem
                                            key={option.value}
                                            name={"autoId"}
                                            value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                            <label style={{color: "#f50057"}}>
                                <ErrorMessage name={"autoId"}/>
                            </label>
                        </FormControl>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <DatePickerField
                                    formikProps={formProps}
                                    id="departureDate"
                                    formikFieldName="departureDate"
                                    label="Departure date"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePickerField
                                    formikProps={formProps}
                                    id="arrivalDate"
                                    formikFieldName="arrivalDate"
                                    label="Arrival date"
                                />
                            </Grid>
                        </Grid>
                        <br/>

                        <FormControl className={classes.formControl}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <InputLabel id="demo-simple-select-label">Control points</InputLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        color='primary'
                                        style={{display: "block", marginLeft: "auto"}}
                                        onClick={handleCreateNewPointClick}>Add control point</Button>
                                </Grid>
                            </Grid>

                            <PointsTable
                                editable={true}
                                points={points}
                                onRowClick={handleTableRowClick}/>
                            <TextField name="points"
                                       type="hidden"
                                       onChange={formProps.handleChange}
                            />
                            <label style={{color: "#f50057"}}>
                                <ErrorMessage name={"points"}/>
                            </label>

                            <PointsDialog
                                open={pointDialogOpen}
                                initPointState={selectedPoint}
                                onSubmit={handlePointDialogSubmit}
                                onClose={handlePointDialogClose}
                                onDelete={handlePointDelete}
                            />
                        </FormControl>
                        <br/>

                        <div className='btn-row'>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"

                            >
                                Save waybill
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={props.onClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
};
