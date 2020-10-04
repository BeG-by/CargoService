import axios from "axios";

export const USER_URL = "/v1/api/users";
export const AUTO_URL = "/v1/api/autos";
export const STORAGE_URL = "/v1/api/storages";
export const OWNER_URL = "/v1/api/owners";
export const INVOICE_URL = "/v1/api/invoices";
export const DATA_FOR_INVOICE_CREATING_URL = "/v1/api/invoices/data-for-creating";
export const WAYBILL_URL = "/v1/api/waybills";
export const POINT_URL = "/v1/api/waybills/points";
export const ACT_URL = "/v1/api/acts";
export const CLIENTS_URL = "/v1/api/clients/";


export const makeRequest = (method, url, data = null) => {
    return data === null ?
        axios({method: method, url: url,}) :
        axios({method: method, url: url, data: data})
};


export const handleRequestError = (error, callback) => {
    if (error.response && error.response.status !== 500) {
        callback("Operation was failed. " + error.response.data, "error");
    } else {
        callback("Operation was failed. Cannot get response from server", "error");
    }
};

