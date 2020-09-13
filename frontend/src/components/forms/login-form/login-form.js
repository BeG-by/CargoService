import React, {Component} from "react";
import axios from 'axios';
import '../forms.css';
import {showError, FormLogin} from "./login-form-views";

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
                        roles: res.data.roles
                    });
                    localStorage.setItem("authorization", res.data.token);
                    localStorage.setItem("role", this.state.roles);
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
        window.location.href = "/mainPage";
        this.props.history.push("/mainPage");
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
            let loginform = FormLogin(this);
            return <div>{loginform}</div>;
        }
    }
}
