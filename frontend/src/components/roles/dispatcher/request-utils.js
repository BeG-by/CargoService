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


export function makeGetProductOwnerByIdRequest(id) {
    const endpoint = `/v1/api/owners/${id}`;
    return axios({
        method: "get",
        url: endpoint,
    });
}

export function makeSaveProductOwnerRequest(productOwner) {
    const endpoint = `/v1/api/owners`;
    console.log(productOwner);
    return axios({
        method: "post",
        url: endpoint,
        data: productOwner,
    });
}

export function makeUpdateProductOwnerRequest(productOwner) {
    const endpoint = `/v1/api/owners`;
    return axios({
        method: "put",
        url: endpoint,
        data: productOwner,
    });
}

export function makeDeleteProductOwnerRequest(id) {
    const endpoint = `/v1/api/owners/${id}`;
    return axios({
        method: "delete",
        url: endpoint,
    });
}
