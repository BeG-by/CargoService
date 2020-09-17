import {ACTION_CHANGE_USER_AND_COMPANY} from "./action-type";

export const changeUserAndCompany = (newUser, newCompany) => {
    return {
        type: ACTION_CHANGE_USER_AND_COMPANY,
        payload: {
            user: newUser,
            company: newCompany
        }
    }
};