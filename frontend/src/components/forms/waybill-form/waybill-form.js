import React, {Component} from "react";
import axios from 'axios';
import {jwtToken} from '../../../security/Interceptors';
import '../forms.css';
import {showError, showWaybillForm} from "./waybill-form-views";

export default class WaybillForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorText: '',
            waybill: {
                invoiceId: 1,// localStorage.getItem('invoiceId'), //fixme передать id ттн
                number: '',
                shipper: '',
                consignee: '',
                driverId: 0,
                products: []
            }
        };
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeShipper = this.onChangeShipper.bind(this);
        this.onChangeConsignee = this.onChangeConsignee.bind(this);
        this.onChangeDriver = this.onChangeDriver.bind(this);
        this.saveWaybill = this.saveWaybill.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    saveWaybill = (values, {
        props = this.props,
        setSubmitting
    }) => {
        setSubmitting(false);

        const endpoint = "/v1/api/waybills";
        const number = this.state.waybill.number;
        const shipper = this.state.waybill.shipper;
        const consignee = this.state.waybill.consignee;
        const driverId = this.state.waybill.driverId;
        const products = this.state.waybill.products;
        const registrationDate = Date.now();
        const waybill_object = {
            number: number,
            shipper: shipper,
            consignee: consignee,
            registrationDate: registrationDate,
            driverId: driverId,
            products: products,
        };

        axios.post(endpoint, waybill_object)
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
                        errorText: "Filling in the waybill failed",
                        error
                    });
                });
    }

    onChangeNumber(event) {
        this.setState({
                waybill: {
                    number: event.target.value,
                    shipper: this.state.waybill.shipper,
                    consignee: this.state.waybill.consignee,
                    driverId: this.state.waybill.driverId,
                }
            }
        );
    }

    onChangeShipper(event) {
        this.setState({
                waybill: {
                    number: this.state.waybill.number,
                    shipper:  event.target.value,
                    consignee: this.state.waybill.consignee,
                    driverId: this.state.waybill.driverId,
                }
            }
        );
    }

    onChangeConsignee(event) {
        this.setState({
                waybill: {
                    number: this.state.waybill.number,
                    shipper: this.state.waybill.shipper,
                    consignee: event.target.value,
                    driverId: this.state.waybill.driverId,
                }
            }
        );
    }

    onChangeDriver(event) {
        this.setState({
                waybill: {
                    number: this.state.waybill.number,
                    shipper: this.state.waybill.shipper,
                    consignee: this.state.waybill.consignee,
                    driverId: event.target.value,
                }
            }
        );
    }

    goBack() {
        this.setState({
            error: null,
            errorText: null,
            waybill: {
                number: '',
                shipper: '',
                consignee: '',
                driverId: 0,
                products: []
            }
        })
    }

    render() {

        const {error} = this.state;
        if (error) {
            let err = showError(this);
            return <div>{err}</div>;
        } else {
            let wbForm = showWaybillForm(this);
            return <div>{wbForm}</div>;
        }
    }

}
