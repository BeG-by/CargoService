import React, {Component} from "react";
import axios from 'axios';
import {jwtToken} from '../../security/Interceptors';
import './login-form.css';
import {showError, showLoginForm} from "./login-form-views";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            user: {login: '', password: '', role: ''}
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
                        role: res.data.role
                    });
                    localStorage.setItem("authorization", res.data.token);
                    return this.showMainPage();
                },
                error => {
                    this.setState({
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
                    } else {
                        alert("Authentication failure");
                    }
                },
                error => {
                    this.setState({
                        error
                    });
                });
    }

    onChangePassword(event) {
        this.setState({
                user: {
                    password: event.target.value,
                    login: this.state.user.login,
                    role: this.state.user.role
                }
            }
        );
    }

    onChangeLogin(event) {
        this.setState({
                user: {
                    password: this.state.user.password,
                    login: event.target.value,
                    role: this.state.user.role
                }
            }
        );
    }

    goBack() {
        this.setState({
            error: null,
            user: {
                password: '',
                login: ''
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
