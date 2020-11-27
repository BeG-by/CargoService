import {ACTION_CHANGE_JWT_TOKEN, ACTION_CHANGE_USER, ACTION_CHANGE_USER_AND_COMPANY} from "./action-type";
// import {NOT_AUTH} from "../../security/private-route";

const initState = {
    jwtToken: "",
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
        roles: ["123"],
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
        case ACTION_CHANGE_JWT_TOKEN:
            return {...state, jwtToken: action.payload.jwtToken}
    }

    return state;
};
