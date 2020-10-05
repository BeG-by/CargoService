import React from "react";

export default function fetchFieldFromObject(obj, prop) {
    if (obj === undefined || obj === null) {
        return null;
    }
    let index = prop.indexOf(".");
    if (index > -1) {
        return fetchFieldFromObject(
            obj[prop.substring(0, index)],
            prop.substr(index + 1)
        );
    }
    return obj[prop];
}


export const copyUser = (user) => {
    return {
        id: user.id,
        login: user.login,
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
        passport: user.passport,
        address:
            {
                country: user.address != null ? user.address.country : "",
                city: user.address != null ? user.address.city : "",
                street: user.address != null ? user.address.street : "",
                house: user.address != null ? user.address.house : "",
                flat: user.address != null ? user.address.flat : "",
            },
        birthday: user.birthday,
        email: user.email,
        status: user.status,
        roles: user.roles,
        photo: user.photo,
        phone: user.phone
    };

};