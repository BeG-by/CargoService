import React, {useEffect} from "react";
import {findUserById} from "./request-util";

export const UserInfo = (props) => {
    const [user, setUser] = React.useState({
        id: 0,
        name: "",
        surname: "",
        patronymic: "",
        birthday: "",
        address: "",
        email: "",
        role: ""
    });

    function handleRequestError(error) {
        if (error.response && error.response.status !== 500) {
            alert("error");
        } else {
            alert("Cannot get response from server");
        }
    }

    async function fetchWaybill(cleanupFunction) {
        let selected = await findUserById(props.userId);
        if (!cleanupFunction) setUser({
            id: selected.id,
            name: selected.name,
            surname: selected.surname,
            patronymic: selected.patronymic,
            birthday: selected.birthday,
            address: selected.country + " " + selected.city + " "
                     + selected.street + " " + selected.house + " " + selected.flat,
            email: selected.email,
            role: selected.roles[0]
        });
    }

    useEffect(() => {
        let cleanupFunction = false;
        fetchWaybill(cleanupFunction)
            .catch((err) => {
                setUser({
                    id: 0,
                    name: "",
                    surname: "",
                    patronymic: "",
                    birthday: "",
                    address: "",
                    email: "",
                    role: ""
                });
                handleRequestError(err);
            });
        return () => cleanupFunction = true;
    }, []);

    //todo info (вместо email сделать кнопку отправки сообщения, это же login)
    return (
        <div>
            {user.name}
        </div>
    );
}