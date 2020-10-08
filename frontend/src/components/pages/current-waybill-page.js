import React, {useEffect} from "react";
import {handleRequestError, makeRequest, WAYBILL_URL} from "../parts/util/request-util";
import {WaybillInfo} from "../roles/driver/waybill-info";

export const CurrentWaybillBody = () => {
    const [current, setCurrent] = React.useState({});

    async function fetchCurrent(cleanupFunction) {
        if (!cleanupFunction) {
            let response = await makeRequest("GET", WAYBILL_URL + "/current");
            setCurrent(response.data);
        }
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchCurrent(cleanupFunction)
            .catch((err) => {
                setCurrent({});
                handleRequestError(err, alert); // TODO notification
            });
        return () => cleanupFunction = true;
    }, []);

    return (
        current.id === null || current.id === undefined ?
            <main className="main-body-field">
                <h2>
                    Actually, you don't have any current waybill for work. Drink a cup of cappuccino.
                </h2>
            </main>
            :
            <main className="main-body-field">
                <WaybillInfo waybillId={current.id}/>
            </main>
    )
}

export default CurrentWaybillBody;