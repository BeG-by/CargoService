import axios from "axios";

/* TODO: refactor */
export function makeGetClientByIdRequest(id) {
  const endpoint = `/v1/api/clients/${id}`;
  return axios({
    method: "get",
    url: endpoint,
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNjAwMTE4MjU5LCJleHAiOjE2MDA5ODIyNTl9.4TrjecDbyND38UvVltvxlrcD5muamAX5LYCCNcOUShM",
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
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNjAwMTE4MjU5LCJleHAiOjE2MDA5ODIyNTl9.4TrjecDbyND38UvVltvxlrcD5muamAX5LYCCNcOUShM",
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
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNjAwMTE4MjU5LCJleHAiOjE2MDA5ODIyNTl9.4TrjecDbyND38UvVltvxlrcD5muamAX5LYCCNcOUShM",
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
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5NzUzODI2LCJleHAiOjE2MDA2MTc4MjZ9.lNXu6BUqKywE2G5CxCnMpam3c76kSLElNeaDTY-pZjA",
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
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5NzUzODI2LCJleHAiOjE2MDA2MTc4MjZ9.lNXu6BUqKywE2G5CxCnMpam3c76kSLElNeaDTY-pZjA",
    },
  });
}
