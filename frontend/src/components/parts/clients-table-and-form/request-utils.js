import axios from "axios";

/* TODO: add error handling, refactor */
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

export async function updateClient(client) {
    console.log(client);
    const endpoint = `/v1/api/clients`;
    return await axios({
        method: "put",
        url: endpoint,
        headers: {
            Authorization:
                "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5NzUzODI2LCJleHAiOjE2MDA2MTc4MjZ9.lNXu6BUqKywE2G5CxCnMpam3c76kSLElNeaDTY-pZjA",
        },
        data: client,
    }).then((res) => {
        return true;
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
    }).then((res) => {
        return true;
    });
}

export async function deleteClient(clientId) {
    const endpoint = `/v1/api/clients/` + clientId;
    return await axios({
        method: "delete",
        url: endpoint,
        headers: {
            Authorization:
                "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5NzUzODI2LCJleHAiOjE2MDA2MTc4MjZ9.lNXu6BUqKywE2G5CxCnMpam3c76kSLElNeaDTY-pZjA",
        },
    }).then((res) => {
        return true;
    });
}
