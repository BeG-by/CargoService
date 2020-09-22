import {ACTION_CHANGE_USER_AND_COMPANY} from "./action-type";

const initState = {
    user: {
        roles: ["UNKNOWN"]
    },
    company: {}
};

export const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_USER_AND_COMPANY:
            return {...state, user: action.payload.user, company: action.payload.company}
    }

    return state;
};