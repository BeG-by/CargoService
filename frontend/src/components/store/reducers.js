import {ACTION_CHANGE_USER, ACTION_CHANGE_USER_AND_COMPANY} from "./action-type";
import {NOT_AUTH} from "../../security/private-route";

const initState = {
    user: {
        id: 0,
        email: "",
        name: "",
        surname: "",
        patronymic: "",
        passport: "",
        address:
            {
                country: "",
                city: "",
                street: "",
                house: "",
                flat: ""
            },
        birthday: "",
        status: "",
        roles: [NOT_AUTH],
        photo: "",
        phone: ""
    },
    company: {}
};

export const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_USER_AND_COMPANY:
            return {...state, user: action.payload.user, company: action.payload.company}
        case ACTION_CHANGE_USER:
            return {...state, user: action.payload.user}
    }

    return state;
};