import axios from "axios";

/* TODO: refactor */
export function makeGetClientByIdRequest(id) {
  const endpoint = `/v1/api/clients/${id}`;
  return axios({
    method: "get",
    url: endpoint,
    headers: {
      Authorization:
        localStorage.getItem("authorization"),
    },
  });
}

export function makeUpdateClientRequest(client) {
  const endpoint = `/v1/api/clients`;
  return axios({
    method: "put",
    url: endpoint,
    headers: {
      Authorization:
        localStorage.getItem("authorization"),
    },
    data: client,
  });
}

export function makeGetAllClientsRequest() {
  const endpoint = `/v1/api/clients`;
  return axios({
    method: "get",
    url: endpoint,
    headers: {
      Authorization:
        localStorage.getItem("authorization"),
    },
  });
}

export function makeSaveClientRequest(client) {
  const endpoint = `/v1/api/clients`;
  return axios({
    method: "post",
    url: endpoint,
    headers: {
      Authorization:
        localStorage.getItem("authorization"),
    },
    data: client,
  });
}

export function makeDeleteClientRequest(clientId) {
  const endpoint = `/v1/api/clients/` + clientId;
  return axios({
    method: "delete",
    url: endpoint,
    headers: {
      Authorization:
        localStorage.getItem("authorization"),
    },
  });

}
