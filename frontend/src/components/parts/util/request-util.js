import axios from "axios";

export const USER_URL = "/v1/api/users";
export const AUTO_URL = "/v1/api/autos";
export const STORAGE_URL = "/v1/api/storages";
export const OWNER_URL = "/v1/api/owners";
export const INVOICE_URL = "/v1/api/invoices";
export const MANAGER_INVOICES_URL = "/v1/api/invoices/manager";
export const DRIVER_INVOICES_URL = "/v1/api/invoices/driver";
export const DISPATCHER_INVOICES_URL = "/v1/api/invoices/dispatcher";
export const DATA_FOR_INVOICE_CREATING_URL = "/v1/api/invoices/initial/data";
export const WAYBILL_URL = "/v1/api/waybills";
export const DRIVER_WAYBILL_URL = "/v1/api/waybills/driver";
export const MANAGER_WAYBILL_URL = "/v1/api/waybills/manager";
export const POINT_URL = "/v1/api/waybills/points";
export const ACT_URL = "/v1/api/acts";
export const CLIENTS_URL = "/v1/api/clients/";
export const LOGOUT_URL = "/v1/api/auth/logout";

export const INVOICE_NOTIFICATION_DATA_URL = "/v1/api/notifications/invoice";
export const WAYBILL_NOTIFICATION_DATA_URL = "/v1/api/notifications/waybill";
export const POINT_NOTIFICATION_DATA_URL = "/v1/api/notifications/point";
export const WEB_SOCKET_CONNECT_URL = "http://localhost:8080/ws";

export const LOGIN_URL = "/v1/api/auth/login";
export const REGISTRATION_URL = "/v1/api/auth/registration";
export const TEMPLATES_URL = "/v1/api/emails/templates";
export const EMAIL_URL = "/v1/api/emails";
export const RESET_PASSWORD_MAIL_URL = "/v1/api/auth/mail";
export const RESET_PASSWORD_URL = "/v1/api/auth/password";
export const STATS_URL = "/v1/api/stats";
export const CALENDAR_URL = "/v1/api/invoices/calendar";
export const OAUTH_LOGIN_URL = "/v1/api/auth/oauth2";


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

