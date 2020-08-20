import React, {Component} from "react";
import axios from "axios";
import jwtToken from "../security/Interceptors";
import './login-form.css';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            user: {login: '', password: '', companyId: '', role: ''}
            // user: {login: '', password: '', surname: '', roles: [] }
        };
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.searchByLoginPass = this.searchByLoginPass.bind(this);
    }

    // async
    searchByLoginPass(event) {
        event.preventDefault();

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
                        companyId: res.data.companyId,
                        role: res.data.role
                    });
                    alert(this.state.user.role + " " + this.state.user.companyId);
                    localStorage.setItem("authorization", res.data.token);
                    return this.showMainPage();
                },
                error => {
                    this.setState({
                        error
                    });
                });

        // await fetch("/v1/api/auth/login", { method: 'POST'})
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             this.setState({
        //                 user: {
        //                     surname: result.surname,
        //                     roles: result.role
        //                 },
        //             });
        //         },
        //         (error) => {
        //             this.setState({
        //                 error
        //             });
        //         }
        //     )
        // if (!this.state.error) {
        //     for (const role of this.state.user.roles) {
        //         await alert(`${role.role} ${this.state.user.surname}, добро пожаловать!`);
        //     }
        // }
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

    // onSubmit(event) {
    //     event.preventDefault();
    //     this.searchByLoginPass();
    // }

    onChangePassword(event) {
        this.setState({
                user: {
                    password: event.target.value,
                    login: this.state.user.login,
                    companyId: this.state.user.companyId,
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
                    companyId: this.state.user.companyId,
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
                <div>
                    <div className="wrapper">
                        <form className="form-login" onSubmit={this.searchByLoginPass}>
                            <h2 className="form-login-heading">Please login</h2>
                            <div className="form-group">
                                <input type="text"
                                       className="form-control"
                                       placeholder="login"
                                       name="login"
                                       value={user.login}
                                       onChange={this.onChangeLogin}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control"
                                       placeholder="password"
                                       name="password"
                                       value={user.password}
                                       onChange={this.onChangePassword}
                                />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                    type="submit"
                                    onSubmit={this.searchByLoginPass}>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            );
            // return (
            //     <form onSubmit={this.onSubmit}>
            //         <p><label> Логин: <input type="text" name="login" value={user.login}
            //                                  onChange={this.onChangeLogin}/></label></p>
            //         <p><label> Пароль: <input type="password" name="password"
            //                                   value={user.password}
            //                                   onChange={this.onChangePassword}/></label></p>
            //         <p><input type="submit" value="Submit"/></p>
            //     </form>
            // );
        }
    }
}