import axios from "axios";

/* TODO: add error handling, refactor */
export async function getClientById(id) {
    const endpoint = `/v1/api/clients/${id}`;
    return await axios({
        method: "get",
        url: endpoint,
        headers: {
            Authorization: localStorage.getItem("authorization"),
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
            Authorization: localStorage.getItem("authorization"),
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
            Authorization: localStorage.getItem("authorization"),
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
            Authorization: localStorage.getItem("authorization"),
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
            Authorization: localStorage.getItem("authorization"),
        },
    }).then((res) => {
        return true;
    });
}
