import React from "react";
import {connect} from "react-redux";
import {NotAuthorized} from "./error-page/error-401";
import ProfileInfo from '../forms/profile-form/profile-info';

const mapStateToProps = (store) => {
    return {
        id: store.user.id,
    }
};

export const ProfileBody = connect(mapStateToProps)((props) => {
    const id = props.id;

    let contentBody = !id ? <NotAuthorized/>
        : <div className="main-body-field">
            <h1>
                Profile info
            </h1>
            <ProfileInfo userId={id}/>
        </div>;


    return (
        <main>
            {contentBody}
        </main>
    );
});
