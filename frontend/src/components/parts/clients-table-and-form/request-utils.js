import axios from "axios";

export async function getClientById(id) {
  const endpoint = `/v1/api/clients/${id}`;
  return await axios({
    method: "get",
    url: endpoint,
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5NzUzODI2LCJleHAiOjE2MDA2MTc4MjZ9.lNXu6BUqKywE2G5CxCnMpam3c76kSLElNeaDTY-pZjA",
    },
  }).then((res) => {
    return res.data;
  });
}

export async function getAllClients() {
  const endpoint = `/v1/api/clients`;
  return await axios({
    method: "get",
    url: endpoint,
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5NzUzODI2LCJleHAiOjE2MDA2MTc4MjZ9.lNXu6BUqKywE2G5CxCnMpam3c76kSLElNeaDTY-pZjA",
    },
  }).then((res) => {
    return res.data;
  });
}

export async function saveClient(client) {
  const endpoint = `/v1/api/clients`;
  return await axios({
    method: "post",
    url: endpoint,
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5NzUzODI2LCJleHAiOjE2MDA2MTc4MjZ9.lNXu6BUqKywE2G5CxCnMpam3c76kSLElNeaDTY-pZjA",
    },
    data: client,
  }).then(() => {
    return true;
  });
}
