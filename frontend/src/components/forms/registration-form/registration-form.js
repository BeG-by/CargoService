import React, {Component} from "react";
import axios from 'axios';
import {jwtToken} from '../../../security/Interceptors';
import './forms.css';
import {showError, showRegistrationForm} from "./registration-form-views";

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorText: '',
            client: {
                name: '',
                type: '',
                pan: '',
                country: '',
                city: '',
                street: '',
                house: '',
                email: '',
                phone: '',
            }
        };
        this.onChangeName = this.onChangeName.bind(this);
        //+ привязка по всем полям
        this.saveClient = this.saveClient.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    saveClient = (values, {
        props = this.props,
        setSubmitting
    }) => {
        setSubmitting(false);

        const endpoint = "/v1/api/clients";
        const name = this.state.client.name;
        //+ остальные поля
        const client_object = {
            name: name,
            type: '',
            pan: '',
            country: '',
            city: '',
            street: '',
            house: '',
            email: '',
            phone: '',
        };

        axios.post(endpoint, client_object)
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
                        errorText: "Registering the client failed",
                        error
                    });
                });
    }

    onChangeName(event) {
        this.setState({
                client: {
                    name: event.target.value,
                    type: this.state.user.roles,
                    pan: this.state.user.roles,
                    country: this.state.user.roles,
                    city: this.state.user.roles,
                    street: this.state.user.roles,
                    house: this.state.user.roles,
                    email: this.state.user.roles,
                    phone: this.state.user.roles,
                }
            }
        );
    }
    //+ остальные onChange по каждому полю

    goBack() {
        this.setState({
            error: null,
            errorText: null,
            client: {
                name: '',
                type: '',
                pan: '',
                country: '',
                city: '',
                street: '',
                house: '',
                email: '',
                phone: '',
            }
        })
    }

    render() {
        const {error} = this.state;
        if (error) {
            let err = showError(this);
            return <div>{err}</div>;
        } else {
            let clientForm = showRegistrationForm(this);
            return <div>{clientForm}</div>;
        }
    }

}