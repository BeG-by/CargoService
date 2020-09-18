import React, {useEffect, useState} from "react";
import PointsDialog from "./points-dialog";
import PointsTable from "./points-table";
import {Formik, Form} from "formik";
import ItemList from "../../parts/lists/item-list";
import {Button} from "@material-ui/core";
import {getAllAutos, saveWaybill} from "../../roles/manager/request-utils";
import {WaybillFormValidation} from "./waybill-form-validation";
import TextField from "@material-ui/core/TextField";
import ClientDialogDatePicker from "../../roles/sysadmin/client-dialog-date-picker";

const EMPTY_AUTO = {
    id: 0,
    mark: "",
    autoType: "",
};

const EMPTY_POINT = {
    id: 0,
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
        if (point.id === 0) {
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
        point.id = pointIndex;
        setPointIndex(point.id + 1);
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
                if (el.id === newPoint.id) {
                    el.waibillId = newPoint.waybillId;
                    el.passed = newPoint.passed;
                    el.place = newPoint.place;
                    el.passageDate = newPoint.passageDate;
                }
            }
            return temp;
        });
    };

    const handlePointDelete = (id) => {
        if (id !== 0) {
            deletePointById(id);
            handlePointDialogClose();
        }
    };

    const deletePointById = (id) => {
        setPoints((prevState) => {
            const temp = [...prevState];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].id === id) {
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
        waybill.autoId = selectedAuto.id;
        waybill.departureDate = values.departureDate;
        waybill.arrivalDate = values.arrivalDate;
        const saveWaybillRequest = async (waybill) => {
            await saveWaybill(waybill);
            props.onClose();
        };
        saveWaybillRequest(waybill);
    };


    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                initialValues={{
                    departureDate: "",
                    arrivalDate: "",
                    invoiceId: invoice.id,
                }}
                onSubmit={handleSubmit}
                validationSchema={WaybillFormValidation}
            >
                {(formProps) => (
                    <Form>
                        <ClientDialogDatePicker
                            formikProps={formProps}
                            id="departureDate"
                            formikFieldName="departureDate"
                            label="Departure date"
                        />
                        <ClientDialogDatePicker
                            formikProps={formProps}
                            id="arrivalDate"
                            formikFieldName="arrivalDate"
                            label="Arrival date"
                        />
                        <TextField
                            disabled={true}
                            id={"autoType"}
                            label={"Auto type"}
                            value={selectedAuto.autoType}
                        />
                        <TextField
                            disabled={true}
                            id={"autoMark"}
                            label={"Auto mark"}
                            value={selectedAuto.mark}
                        />

                        <ItemList
                            items={autos}
                            onRowClick={(item) => {
                                setSelectedAuto(item);
                            }}
                        />

                        <PointsTable
                            points={points}
                            onRowClick={handleTableRowClick}/>

                        <PointsDialog
                            open={pointDialogOpen}
                            initPointState={selectedPoint}
                            onSubmit={handlePointDialogSubmit}
                            onClose={handlePointDialogClose}
                            onDelete={handlePointDelete}
                        />

                        <Button onClick={handleCreateNewPointClick}>Add point</Button>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save waybill
                        </Button>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
};
