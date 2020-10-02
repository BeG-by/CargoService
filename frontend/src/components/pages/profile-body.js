import React from "react";
import {UserInfo} from "../roles/admin/user-info";
import {connect} from "react-redux";
import {NotAuthorized} from "./error-page/error-401";

const mapStateToProps = (store) => {
    return {
        id: store.user.id
    }
};

export const ProfileBody = connect(mapStateToProps)((props) => {
    const id = props.id;
    return id === null || id === undefined
        ? <NotAuthorized/>
        : <div>
            <h2>
                Here is your personal info.
            </h2>
            <UserInfo userId={id}/>
        </div>;
});
