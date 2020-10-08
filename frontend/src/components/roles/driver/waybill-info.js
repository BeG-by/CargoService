import React, {useEffect} from "react";
import WaybillInfoContent from "./waybill-info-content";
import {handleRequestError, makeRequest, POINT_URL, WAYBILL_URL} from "../../parts/util/request-util";
import ActDialog from "./act-dialog";
import {DialogWindow} from "../../parts/dialogs/dialog";
import {FillActDialog} from "../../parts/dialogs/fill-act";
import {CloseInvoice} from "../../parts/dialogs/close-invoice";
import {convertPointsFromBackendApi} from "../../../map/utils";

export const WaybillInfo = (props) => {
    const [waybill, setWaybill] = React.useState({
        id: 0,
        departureDate: "",
        arrivalDate: "",
        points: [],
        invoice: {},
        auto: {id: 0, mark: "", type: ""},
        driver: {id: 0, name: "", surname: ""},
        shipper: {address: {}},
        checkingUser: {},
        consignee: {address: {}},
    });
    const [actFillDialogOpen, setActFillDialogOpen] = React.useState(false);
    const [invoiceCloseDialogOpen, setInvoiceCloseDialogOpen] = React.useState(false);
    const [actDialogOpen, setActDialogOpen] = React.useState(false);
    const [form, setForm] = React.useState(null);

    const handleActFormOpen = () => {
        setActFillDialogOpen(false);
        setActDialogOpen(true);
    }

    const handleClose = () => {
        setActFillDialogOpen(false);
        setInvoiceCloseDialogOpen(false);
        setActDialogOpen(false);
    };

    const handleCloseInvoice = () => {
        const form = <CloseInvoice handleClose={handleClose} invoice={waybill.invoice}/>
        setForm(form);
    }

    const handleActFill = async () => {
        setForm(FillActDialog(handleActFormOpen, handleCloseInvoice));
        setActFillDialogOpen(true);
    }

    //TODO question. Second request ?
    let updated = {};

    async function fetchWaybill(cleanupFunction) {
        let response = await makeRequest("GET", WAYBILL_URL + "/" + props.waybillId);
        let selected = updated = response.data;
        if (!cleanupFunction) {
            console.log("SELECTED POINTS");
            console.log(selected.points);
            setWaybill({
                id: selected.id,
                departureDate: selected.departureDate,
                arrivalDate: selected.arrivalDate,
                points: selected.points,
                invoice: selected.invoice,
                auto: {id: selected.auto.id, mark: selected.auto.mark, type: selected.auto.autoType},
                driver: selected.invoice.driver,
                checkingUser: selected.invoice.checkingUser,
                shipper: selected.invoice.shipper,
                consignee: selected.invoice.consignee,
            });
        }
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchWaybill(cleanupFunction)
            .catch((err) => {
                setWaybill({
                    id: 0,
                    departureDate: "",
                    arrivalDate: "",
                    points: [],
                    invoice: {},
                    auto: {id: 0, mark: "", type: ""},
                    driver: {id: 0, name: "", surname: ""},
                    shipper: {address: {}},
                    consignee: {address: {}},
                    checkingUser: {},
                });
                handleRequestError(err, alert); //TODO toast
            });
        return () => cleanupFunction = true;
    }, []);


    const handleMarkerPass = async (point) => {
        point.id = point.index;
        await makeRequest("PUT", POINT_URL, point);
        await fetchWaybill(false);
        let checkPassage = true;
        if (!updated.points) {
            checkPassage = false;
        } else {
            updated.points.forEach(p => {
                if (!p.passed) {
                    checkPassage = false;
                }
            });
        }
        if (checkPassage) {
            await handleActFill(waybill);
        }
    }

    const content = <div>
        <WaybillInfoContent
            waybill={waybill}
            action={fetchWaybill}
            onUpdatePoint={handleMarkerPass}
        />
    </div>

    return (
        <div>
            {content}

            <ActDialog
                waybill={waybill}
                open={actDialogOpen}
                onClose={() => {
                    setActDialogOpen(false);
                }}
                onSave={props.onSave}
            />

            <DialogWindow
                dialogTitle="Confirmation"
                handleClose={handleCloseInvoice}
                openDialog={actFillDialogOpen}
                form={form}
            />

            <DialogWindow
                dialogTitle="Confirmation"
                handleClose={handleClose}
                openDialog={invoiceCloseDialogOpen}
                form={form}
            />
        </div>
    );
}