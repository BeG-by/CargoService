import React from "react";
import {UserInfo} from "../roles/admin/user-info";
import {connect} from "react-redux";

const mapStateToProps = (store) => {
    return {
        id: store.user.id
    }
};

export const ProfileBody = connect(mapStateToProps)((props) => {
    const id = props.id;
    return <div>
        <h2>
            Here is your personal info.
        </h2>
        <UserInfo userId={id}/>
    </div>;
});
//todo change password + avatar