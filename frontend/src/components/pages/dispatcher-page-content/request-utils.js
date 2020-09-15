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
