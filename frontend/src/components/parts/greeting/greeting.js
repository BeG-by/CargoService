import React, {useEffect} from "react";
import {connect} from "react-redux";
import useToast from "../toast-notification/useToast";

const mapStateToProps = (store) => {
    return {
        userId: store.user.id,
        username: store.user.name,
        userPatronymic: store.user.patronymic,
    }
};

const isNightTime = () => {
    const hours = new Date().getHours()
    return hours >= 0 && hours <= 5
}

const isDayTime = () => {
    const hours = new Date().getHours()
    return hours >= 14 && hours <= 17
}

const isEveningTime = () => {
    const hours = new Date().getHours()
    return hours >= 18 && hours <= 24
}

const isMorningTime = () => {
    const hours = new Date().getHours()
    return hours >= 6 && hours <= 13
}

export const Greeting = connect(mapStateToProps)((props) => {
    const [NotificationToast, openNotificationToast] = useToast();

    useEffect(() => {
        if (props.userId > 0) {
            if (isDayTime()) {
                openNotificationToast([`Good day `, <strong> {props.username} {props.userPatronymic}</strong>])
            } else if (isEveningTime()) {
                openNotificationToast([`Good evening `, <strong> {props.username} {props.userPatronymic}</strong>])
            } else if (isMorningTime()) {
                openNotificationToast([`Good morning `, <strong> {props.username} {props.userPatronymic}</strong>])
            } else if (isNightTime()) {
                openNotificationToast([`Good night `, <strong> {props.username} {props.userPatronymic}</strong>])
            }
        }
    }, [props.userId])

    return (<div>{NotificationToast}</div>)
});