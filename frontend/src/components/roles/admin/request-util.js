import axios from "axios";

const endpoint = "/v1/api/users";

export const findUserById = (id) => {
    return axios({
        method: "get",
        url: endpoint + "/" + id,
    })
};

export const findAllUsers = () => {
    return axios({
        method: "get",
        url: endpoint,
    })
};

export const updateUser = (user) => {
    return axios({
        method: "put",
        url: endpoint,
        data: user
    })
};

export const saveUser = (user) => {
    return axios({
        method: "post",
        url: endpoint,
        data: user
    })
};

export const deleteUser = (id) => {
    return axios({
        method: "delete",
        url: endpoint + "/" + id,
    })
};