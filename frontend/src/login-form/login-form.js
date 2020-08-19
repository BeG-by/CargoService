import React, {Component} from 'react';
import './login-form.css';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            user: {login: '', password: '', surname: '', roles: []}
        };
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async searchByLoginPass() {
        await fetch("/v1/api/users/authenticate", { method: 'POST'})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        user: {
                            login: result.login,
                            password: result.password,
                            surname: result.surname,
                            roles: result.role
                        },
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
        if (!this.state.error) {
            for (const role of this.state.user.roles) {
                await alert(`${role.role} ${this.state.user.surname}, добро пожаловать!`);
            }
        }
    }

    onSubmit(event) {
        this.searchByLoginPass();
        event.preventDefault();
    }

    onChangePassword(event) {
        this.setState(
            {
                user:
                    {
                        password: event.target.value,
                        login: this.state.user.login,
                        surname: this.state.user.surname
                    }
            }
        );
    }

    onChangeLogin(event) {
        this.setState(
            {
                user:
                    {
                        password: this.state.user.password,
                        login: event.target.value,
                        surname: this.state.user.surname
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
                <form onSubmit={this.onSubmit}>
                    <p><label> Логин: <input type="text" name="login" value={user.login}
                                             onChange={this.onChangeLogin}/></label></p>
                    <p><label> Пароль: <input type="password" name="password"
                                              value={user.password}
                                              onChange={this.onChangePassword}/></label></p>
                    <p><input type="submit" value="Submit"/></p>
                </form>
            );
        }
    }
}