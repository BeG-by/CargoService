import {ACTION_CHANGE_USER, ACTION_CHANGE_USER_AND_COMPANY} from "./action-type";

const initState = {
    user: {
        id: 0,
        login: "",
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
        email: "",
        status: "",
        roles: ["UNKNOWN"],
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