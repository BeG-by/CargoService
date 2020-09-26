import axios from "axios";

/* TODO: add error handling, refactor */
export async function getWaybillById(id) {
    const endpoint = `/v1/api/waybills/${id}`;
    return await axios({
        method: "get",
        url: endpoint,
    }).then((res) => {
        return res.data;
    });
}

export async function getPointById(id) {
    const endpoint = `/v1/api/waybills/points/${id}`;
    return await axios({
        method: "get",
        url: endpoint,
    }).then((res) => {
        return res.data;
    });
}

export async function updatePoint(point) {
    const endpoint = `/v1/api/waybills/points`;
    return await axios({
        method: "post",
        url: endpoint,
        data: point,
    }).then((res) => {
        return true;
    });
}

export async function getAllWaybills() {
    const endpoint = `/v1/api/waybills`;
    return await axios({
        method: "get",
        url: endpoint
    }).then((res) => {
        return res.data;
    });
}

export async function saveAct(act) {
    const endpoint = `/v1/api/acts`;
    return await axios({
        method: "post",
        url: endpoint,
        data: act,
    }).then((res) => {
        return true;
    });
}
