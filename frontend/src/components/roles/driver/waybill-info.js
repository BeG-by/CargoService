import React, {useEffect} from "react";
import {getWaybillById} from "./request-utils";
import InvoiceInfoContent from "./invoice-info-content";

export const WaybillInfo = (props) => {
    const [waybill, setWaybill] = React.useState({
        id: 0,
        departureDate: "",
        arrivalDate: "",
        points: [],
        invoice: {id: 0, number: ""},
        auto: {id: 0, mark: 0},
    });

    async function fetchWaybill(cleanupFunction) {
        let selected = await getWaybillById(props.waybillId);
        if(!cleanupFunction) setWaybill({
            id: selected.id,
            departureDate: selected.departureDate,
            arrivalDate: selected.arrivalDate,
            points: selected.points,
            invoice: {id: selected.invoice.id, number: selected.invoice.number},
            auto: {id: selected.auto.id, mark: selected.auto.mark}
        });
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchWaybill(cleanupFunction);
        return () => cleanupFunction = true;
    }, []);

    const content = <div>
        <InvoiceInfoContent waybill={waybill} />
    </div>

    return (
        <div>
            {content}
        </div>
    );
}