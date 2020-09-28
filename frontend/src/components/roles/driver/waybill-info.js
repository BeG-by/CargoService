import React, {useEffect} from "react";
import {getWaybillById} from "./request-utils";
import WaybillInfoContent from "./waybill-info-content";

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

    function handleRequestError(error) {
        if (error.response && error.response.status !== 500) {
            alert("error");
        } else {
            alert("Cannot get response from server");
        }
    }

    async function fetchWaybill(cleanupFunction) {
        let selected = await getWaybillById(props.waybillId);
        if(!cleanupFunction) setWaybill({
            id: selected.id,
            departureDate: selected.departureDate,
            arrivalDate: selected.arrivalDate,
            points: selected.points,
            invoice: {id: selected.invoice.id, number: selected.invoice.number},
            auto: {id: selected.auto.id, mark: selected.auto.mark, type: selected.auto.autoType},
            driver: {
                id: selected.invoice.driver.id,
                name: selected.invoice.driver.name,
                surname: selected.invoice.driver.surname},
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
                    invoice: {id: 0, number: ""},
                    auto: {id: 0, mark: "", type: ""},
                    driver: {id: 0, name: "", surname: ""},
                    shipper: "",
                    consignee: "",
                });
                handleRequestError(err);
            });
        return () => cleanupFunction = true;
    }, []);

    const content = <div>
        <WaybillInfoContent waybill={waybill} action={fetchWaybill}/>
    </div>

    return (
        <div>
            {content}
        </div>
    );
}