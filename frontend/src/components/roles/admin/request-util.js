import axios from "axios";

export const getUserById = (id) => {
    const endpoint = "/v1/api/users/" + id;
    return axios({
        method: "get",
        url: endpoint,
    })
};

export const getAllUsers = () => {
    const endpoint = "/v1/api/users";
    return axios({
        method: "get",
        url: endpoint,
    })
};

export const updateUser = (user) => {
    const endpoint = "/v1/api/users";
    return axios({
        method: "put",
        url: endpoint,
        data: user
    })
};