import React, {useEffect} from "react";
import {getWaybillById, updatePoint} from "./request-utils";
import WaybillInfoContent from "./waybill-info-content";
import {connect} from "react-redux";

export const WaybillInfo = (props) => {
    const [waybill, setWaybill] = React.useState({
        id: 0,
        departureDate: "",
        arrivalDate: "",
        points: [],
        invoice: {id: 0, number: ""},
        auto: {id: 0, mark: "", type: ""},
        driver: {id: 0, name: "", surname: ""},
        shipper: "",
        consignee: "",
    });

    async function fetchWaybill(cleanupFunction) {
        let selected = await getWaybillById(props.waybillId);
        if (!cleanupFunction)
            setWaybill({
                id: selected.id,
                departureDate: selected.departureDate,
                arrivalDate: selected.arrivalDate,
                points: selected.points,
                invoice: {id: selected.invoice.id, number: selected.invoice.number},
                auto: {id: selected.auto.id, mark: selected.auto.mark, type: selected.auto.type},
                driver: {
                    id: selected.invoice.driver.id,
                    name: selected.invoice.driver.name,
                    surname: selected.invoice.driver.surname
                },
                shipper: selected.invoice.shipper,
                consignee: selected.invoice.consignee,
            });
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchWaybill(cleanupFunction);
        return () => cleanupFunction = true;
    }, []);


    const handleMarkerPass = async (point) => {
        await updatePoint(point);
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