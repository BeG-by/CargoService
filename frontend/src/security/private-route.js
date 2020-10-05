import React from "react";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import {NoRights} from "../components/pages/error-page/error-403";
import {NotAuthorized} from "../components/pages/error-page/error-401";

export const NOT_AUTH = "UNKNOWN";
export const ROLE_ADMIN = "ADMIN";
export const ROLE_SYSADMIN = "SYSADMIN";
export const ROLE_DISPATCHER = "DISPATCHER";
export const ROLE_MANAGER = "MANAGER";
export const ROLE_DRIVER = "DRIVER";
export const ROLE_OWNER = "OWNER";


export const PrivateRoute = ({role, component: Component, hasAnyAuthorities = [], ...rest}) => {

    const isAuth = localStorage.getItem("authorization") !== null;

    if (isAuth) {
        return isAuthorize(role, hasAnyAuthorities) ?
            <Route {...rest} component={Component}/> :
            <NoRights/>
    }

    return <NotAuthorized/>;

};


export const isAuthorize = (role, authorities) => {
    if (authorities.length === 0) {
        return true;
    }
    return authorities.includes(role);
};


const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};


export default connect(mapStateToProps)(PrivateRoute);