import {ACTION_CHANGE_USER_AND_COMPANY} from "./action-type";

const initialState = {
    user: {},
    company: {}
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_USER_AND_COMPANY:
            return {...state, user: action.payload.user, company: action.payload.company}
    }

    return state;
};