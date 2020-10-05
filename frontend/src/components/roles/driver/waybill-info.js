import React, {useEffect} from "react";
import WaybillInfoContent from "./waybill-info-content";
import {handleRequestError, makeRequest, POINT_URL, WAYBILL_URL} from "../../parts/util/request-util";

export const WaybillInfo = (props) => {
    const [waybill, setWaybill] = React.useState({
        id: 0,
        departureDate: "",
        arrivalDate: "",
        points: [],
        invoice: {id: 0, number: "", checkingUser: {}},
        auto: {id: 0, mark: "", type: ""},
        driver: {},
        checkingUser: {},
        shipper: "",
        consignee: "",
    });

    //TODO question. Second request ?

    async function fetchWaybill(cleanupFunction) {
        let response = await makeRequest("GET", WAYBILL_URL + "/" + props.waybillId);
        let selected = response.data;
        if (!cleanupFunction)
            setWaybill({
                id: selected.id,
                departureDate: selected.departureDate,
                arrivalDate: selected.arrivalDate,
                points: selected.points,
                invoice: {
                    id: selected.invoice.id,
                    number: selected.invoice.number,
                    checkingUser: selected.invoice.checkingUser,
                },
                auto: {id: selected.auto.id, mark: selected.auto.mark, type: selected.auto.autoType},
                driver: selected.invoice.driver,
                checkingUser: selected.invoice.checkingUser,
                shipper: selected.invoice.shipper,
                consignee: selected.invoice.consignee,
            });
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
                    invoice: {id: 0, number: "", checkingUser: {}},
                    auto: {id: 0, mark: "", type: ""},
                    driver: {id: 0, name: "", surname: ""},
                    shipper: "",
                    consignee: "",
                });
                handleRequestError(err, alert); //TODO toast
            });
        return () => cleanupFunction = true;
    }, []);


    const handleMarkerPass = async (point) => {
        await makeRequest("PUT", POINT_URL, point);
        fetchWaybill(false);
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
        </div>
    );
}