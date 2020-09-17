import axios from "axios";

export function makeGetAllProductOwnersRequest() {
  const endpoint = `/v1/api/owners`;
  return axios({
    method: "get",
    url: endpoint,
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
  });
}

export function makeSaveInvoiceRequest(invoice) {
  const endpoint = "/v1/api/invoices";
  return axios({
    method: "post",
    url: endpoint,
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
    data: invoice,
  });
}

export function makeGetAllDriversRequest() {
  const endpoint = `/v1/api/drivers`;
  return axios({
    method: "get",
    url: endpoint,
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
  });
}
