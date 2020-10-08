import React, {useEffect, useState} from "react";
import {Formik, Form, ErrorMessage} from "formik";
import {Button} from "@material-ui/core";
import {getAllAutos, saveWaybill} from "../../roles/manager/request-utils";
import {WaybillFormValidation} from "../../parts/validation/waybill-form-validation";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DatePickerField from "../../parts/layout/date-picker";
import Grid from "@material-ui/core/Grid";
import ManagerMapForPointAdding from "../../../map/manager-map-for-points-creating";
import {convertPointsFromBackendApi, convertPointsToBackendApi} from "../../../map/utils";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useToast from "../../parts/toast-notification/useToast";
import AutoSearch from "./auto-search";

const EMPTY_AUTO = {
    id: -1,
    mark: "",
    autoType: "",
};

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const WaybillForm = connect(mapStateToProps)((props) => {
    const role = props.role;
    const [ToastComponent, openToast] = useToast();
    const [invoice, setInvoice] = useState(props.invoice);
    const [selectedAuto, setSelectedAuto] = useState(EMPTY_AUTO);
    const [pointIndex, setPointIndex] = useState(0);
    const [points, setPoints] = useState([]);
    const [autos, setAutos] = useState([]);
    const useStyles = makeStyles(() => ({
        formControl: {
            marginTop: 20,
            minWidth: "100%",
        },
        infoPart: {
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: "35%",
            padding: 10
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

    const handlePointDelete = (marker) => {
        for (let i = 0; i < points.length; i++) {
            if (marker.index === points[i].index) {
                setPoints(prevState => {
                    let markers = prevState;
                    markers.splice(i, 1);
                    return markers;
                })
            }
        }
    }

    const handlePointAdd = (event) => {
        setPoints(prevState => [...prevState, {
            isPassed: false,
            passageDate: null,
            index: pointIndex,
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        }])
        setPointIndex(pointIndex + 1);
    };


    const handleSubmit = (values) => {
        if (points.length > 1) {
            if (selectedAuto.id === -1) {
                openToast("Select auto", "warning")
                return;
            }
            
            const waybill = {};
            waybill.points = convertPointsToBackendApi(points);
            waybill.invoiceId = values.invoiceId;
            waybill.autoId = selectedAuto.id;
            waybill.departureDate = values.departureDate;
            waybill.arrivalDate = values.arrivalDate;
            const saveWaybillRequest = async (waybill) => {
                await saveWaybill(waybill);
                props.onSave();
                props.onClose();
                // notification
            };
            saveWaybillRequest(waybill);
        } else {
            openToast("It's necessary to put at least 2 point", "warning")
        }
    };

    const handleAutoSelect = (auto) => {
        if (auto === null)
            setSelectedAuto(EMPTY_AUTO)
        else {
            setSelectedAuto(auto);
        }
    };
    

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
                        <div className="info-content">
                            <div className="info-content-column">
                                <Paper className={`table-paper`}
                                       style={{flexDirection: "column", alignItems: "flex-start", minWidth: "35%", padding: 10}}>
                                    <FormControl className={classes.formControl}>
                                        <AutoSearch autoArr={autos} onAutoSelect={handleAutoSelect}/>
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
                                    
                                    <TextField name="shipper"
                                               label="Shipper"
                                               type="text"
                                               id="shipper"
                                               disabled={true}
                                               value={invoice.shipper.email}
                                               style={{width: "100%"}}/>

                                    <br/><br/>
                                    <TextField name="consignee"
                                               label="Consignee"
                                               type="text"
                                               id="consignee"
                                               disabled={true}
                                               value={invoice.consignee.email}
                                               style={{width: "100%"}}/>

                                    <br/><br/>
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
                                </Paper>

                                <Paper className={`table-paper`}
                                       style={{flexDirection: "column", alignItems: "flex-start", padding: 10}}>
                                    <ManagerMapForPointAdding
                                        markers={points}
                                        onMarkerAdd={handlePointAdd}
                                        onMarkerDelete={handlePointDelete}
                                    />
                                </Paper>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            {ToastComponent}
        </React.Fragment>
    );
});
