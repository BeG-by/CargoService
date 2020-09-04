import React, {Component} from "react";
import axios from 'axios';
import {jwtToken} from '../../../security/Interceptors';
import '../forms.css';
import {showError, showTtnForm} from "./invoice-form-views";

export default class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorText: '',
            ttn: {login: '', password: '',}
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

        const endpoint = "/v1/api/ttn";
        const login = this.state.ttn.login;
        const password = this.state.ttn.password;
        const user_object = {
            login: login,
            password: password
        };

        axios.post(endpoint, user_object)
            .then(res => {
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
                        errorText: "Something goes wrong",
                        error
                    });
                });
    }

    onChangePassword(event) {
        this.setState({
                user: {
                    password: event.target.value,
                    login: this.state.ttn.login,
                }
            }
        );
    }

    onChangeLogin(event) {
        this.setState({
                user: {
                    password: this.state.ttn.password,
                    login: event.target.value,
                }
            }
        );
    }

    goBack() {
        this.setState({
            error: null,
            errorText: null,
            ttn: {
                password: '',
                login: '',
            }
        })
    }

    render() {
        const {error} = this.state;
        if (error) {
            let err = showError(this);
            return <div>{err}</div>;
        } else {
            let invoice = showTtnForm(this);
            return <div>{invoice}</div>;
        }
    }
}
