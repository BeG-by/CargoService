import React, {Component} from "react";
import axios from 'axios';
import '../forms.css';
import {LoginFormError, LoginFormView} from "./login-form-views";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeUserAndCompany} from "../../store/actions";
import {withRouter} from "react-router-dom"

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorText: '',
            user: {login: '', password: '', roles: []}
        };
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    searchByLoginPass = (values, {props = this.props, setSubmitting}) => {
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
                    let data = res.data;
                    localStorage.setItem("authorization", data.token);
                    props.changeUserAndCompany(data.user, data.company);
                    this.props.history.push("/main");
                },
                error => {
                    this.setState({
                        errorText: "Something goes wrong...",
                        error
                    });
                });
    };

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
            let err = LoginFormError(this);
            return <div>{err}</div>;
        } else {
            let loginform = LoginFormView(this);
            return <div>{loginform}</div>;
        }
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        changeUserAndCompany: bindActionCreators(changeUserAndCompany, dispatch)
    }
};

export default withRouter(connect(null, mapActionsToProps)(LoginForm));
