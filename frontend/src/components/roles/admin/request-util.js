import axios from "axios";

export const USER_URL = "/v1/api/users";
export const AUTO_URL = "/v1/api/autos";


export const makeRequest = (method, url, data = null) => {
    return data === null ?
        axios({method: method, url: url,}) :
        axios({method: method, url: url, data: data})
};

