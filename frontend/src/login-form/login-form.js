import React, {Component} from "react";
import axios from 'axios';
import {jwtToken} from '../security/Interceptors';
import {validationSchema} from '../validation/validation-schema';
import './login-form.css';
import RaisedButton from 'material-ui/RaisedButton';
import {ErrorMessage, Field, Form, Formik} from 'formik';

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

    render() {
        const {error, user} = this.state;
        if (error) {
            return <div><h2>Ошибка: {error.message}</h2></div>;
        } else {
            return (
                <Formik
                    enableReinitialize
                    initialValues={{
                        username: user.login,
                        password: user.password
                    }}
                    validationSchema={validationSchema}
                    onSubmit={this.searchByLoginPass}
                    render={formProps => {
                        return (
                            <Form>
                                <h2 className="form-signin-heading">Sign in, please</h2>
                                <div style={{color: 'crimson', fontSize: '18px'}}>
                                    <ErrorMessage name="username"/>
                                </div>
                                <div className="form-group">
                                    <Field type="text"
                                           className="form-control"
                                           name="username"
                                           placeholder="login"
                                           maxLength="16"
                                           onChange={this.onChangeLogin}
                                    />
                                </div>
                                <br/>
                                <div style={{color: 'crimson', fontSize: '18px'}}>
                                    <ErrorMessage name="password"/>
                                </div>
                                <div className="form-group">
                                    <Field type="password"
                                           className="form-control"
                                           name="password"
                                           placeholder="password"
                                           maxLength="16"
                                           onChange={this.onChangePassword}
                                    />
                                </div>
                                <br/>
                                <RaisedButton type="submit" disabled={formProps.isSubmitting}>
                                    sign in
                                </RaisedButton>
                            </Form>
                        );
                    }}
                />);
        }
    }
}
