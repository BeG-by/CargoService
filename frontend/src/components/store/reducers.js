import {ACTION_CHANGE_USER_AND_COMPANY} from "./action-type";
import axios from "axios";


// const initState = () => {
//
//     const token = localStorage.getItem("authorization");
//     const endpoint = "/v1/api/users/info";
//     let data = {
//         info: {}
//     };
//
//     if (token !== null) {
//
//         return axios({
//             method: "GET",
//             url: endpoint,
//         })
//     }
//
//     return data;
//
// };


export const rootReducer = (state, action) => {
    switch (action.type) {
        case ACTION_CHANGE_USER_AND_COMPANY:
            return {...state, user: action.payload.user, company: action.payload.company}
    }

    return state;
};