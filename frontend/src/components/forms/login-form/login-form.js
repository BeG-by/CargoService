import React, {Component} from "react";
import axios from 'axios';
import {jwtToken} from '../../../security/Interceptors';
import './login-form.css';
import {showError, showLoginForm} from "./login-form-views";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorText: '',
            user: {login: '', password: '', roles: []}
        };
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.searchByLoginPass = this.searchByLoginPass.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    searchByLoginPass = (values, {
        props = this.props,
        setSubmitting
    }) => {
        setSubmitting(false);

        const endpoint = "/v1/api/auth/login";
        const login = this.state.user.login;
        const password = this.state.user.password;
        const user_object = {
            login: login,
            password: password
        };

        axios.post(endpoint, user_object)
            .then(res => {
                    this.setState({
                        roles: res.data.role
                    });
                    localStorage.setItem("authorization", res.data.token);
                    return this.showMainPage();
                },
                error => {
                    this.setState({
                        errorText: "Something goes wrong...",
                        error
                    });
                });
    }

    showMainPage() {
        const endpoint = "/mainPage";
        axios.get(endpoint)
            .then(res => {
                    if (res.data === "success") {
                        this.props.history.push("/mainPage");
                    }
                },
                error => {
                    this.setState({
                        errorText: "Authentication failure",
                        error
                    });
                });
    }

    onChangePassword(event) {
        this.setState({
                user: {
                    password: event.target.value,
                    login: this.state.user.login,
                    roles: this.state.user.roles
                }
            }
        );
    }

    onChangeLogin(event) {
        this.setState({
                user: {
                    password: this.state.user.password,
                    login: event.target.value,
                    roles: this.state.user.roles
                }
            }
        );
    }

    goBack() {
        this.setState({
            error: null,
            errorText: null,
            user: {
                password: '',
                login: '',
                roles: []
            }
        })
    }

    render() {
        const {error} = this.state;
        if (error) {
            let err = showError(this);
            return <div>{err}</div>;
        } else {
            let loginform = showLoginForm(this);
            return <div>{loginform}</div>;
        }
    }
}
