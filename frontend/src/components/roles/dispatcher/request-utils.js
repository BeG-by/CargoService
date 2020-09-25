import axios from "axios";

export function makeGetAllProductOwnersRequest() {
    const endpoint = `/v1/api/owners`;
    return axios({
        method: "get",
        url: endpoint,
    });
}

export function makeSaveInvoiceRequest(invoice) {
    const endpoint = "/v1/api/invoices";
    return axios({
        method: "post",
        url: endpoint,
        data: invoice,
    });
}

export function makeUpdateInvoiceRequest(invoice) {
    const endpoint = "/v1/api/invoices";
    return axios({
        method: "put",
        url: endpoint,
        data: invoice,
    });
}

export function makeGetAllInvoicesRequest() {
    const endpoint = `/v1/api/invoices`;
    return axios({
        method: "get",
        url: endpoint
    });
}


export function makeGetAllDriversRequest() {
    const endpoint = `/v1/api/drivers`;
    return axios({
        method: "get",
        url: endpoint,
    });
}

export function makeGetInvoiceByIdRequest(id) {
    const endpoint = `/v1/api/invoices/${id}`;
    return axios({
        method: "get",
        url: endpoint,
    });
}
