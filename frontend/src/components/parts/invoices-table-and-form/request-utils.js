import axios from "axios";

/* TODO: add error handling, refactor */
export async function getInvoiceById(id) {
    const endpoint = `/v1/api/invoices/${id}`;
    return await axios({
        method: "get",
        url: endpoint,
    }).then((res) => {
        return res.data;
    });
}

export async function getDriverById(id) {
    const endpoint = `/v1/api/drivers/${id}`;
    return await axios({
        method: "get",
        url: endpoint,
    }).then((res) => {
        return res.data;
    });
}

export async function updateInvoiceStatus(invoice) {
    const endpoint = `/v1/api/invoices/status`;
    alert(endpoint);
    return await axios({
        method: "post",
        url: endpoint,
        data: invoice,
    }).then((res) => {
        return true;
    });
}

export async function getAllInvoices() {
    const endpoint = `/v1/api/invoices`;
    return await axios({
        method: "get",
        url: endpoint
    }).then((res) => {
        return res.data;
    });
}

export async function saveWaybill(waybill) {
    const endpoint = `/v1/api/waybills`;
    return await axios({
        method: "post",
        url: endpoint,
        data: waybill,
    }).then((res) => {
        return true;
    });
}
