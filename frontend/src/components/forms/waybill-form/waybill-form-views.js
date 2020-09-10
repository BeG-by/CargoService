import Button from '@material-ui/core/Button';
import {validationSchema} from "../../../validation/validation-schema";
import {Field, Form, Formik} from "formik";
import React from "react";
import {
    FormikField,
    WbConsigneeField,
    WbNumberField,
    WbShipperField
} from "../../parts/formik-field";
import {SubmitButton} from "../../parts/buttons/submit-button";
import axios from "axios";
import ReturnButton from "../../parts/buttons/return-button";

export function showError(object) {
    return (
        <div className="form-signin">
            <p className="error-text">{object.state.errorText}</p>
            <Button variant="contained" color="secondary" onClick={object.goBack}>
                back
            </Button>
        </div>);
}

export function showWaybillForm(object) {
    // let options = [<option value='0'/>]; //fixme включить при отправке запроса
    let options = [<option key='0' value='0'/>,
        <option key='1'  value='1'>John Smith</option>,
        <option key='2'  value='2'>Peter Blacksmith</option>];
    let products = [];

    const getDrivers = () => {
        const endpoint = "/v1/api/drivers";
        axios.get(endpoint)
            .then(res => {
                    const drivers = res.data;
                    let option = null;
                    drivers.forEach(driver => {
                        option = <option value={driver.id}>{driver.name} {driver.surname}</option>;
                        options.push(option);
                    });
                },
                error => {
                    console.log(error);
                });
    }

    getDrivers();

    const getProducts = () => {
        const endpoint = "/v1/api/waybills/" + object.state.waybill.invoiceId; //fixme url & res.data & error
        axios.get(endpoint)
            .then(res => {
                    if (res.data === "success") {
                        products = res.data;
                        products.forEach(product => {
                            //fixme отрисовка таблицы продуктов
                        })
                    }
                },
                error => {
                    console.log(error);
                });
    }

    getProducts();

    const {waybill} = object.state;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                wbNumber: waybill.number,
                shipper: waybill.shipper,
                consignee: waybill.consignee,
                driverId: waybill.driverId,
            }}
            validationSchema={validationSchema}
            onSubmit={object.saveWaybill}>
            {formProps => {
                return (
                    <Form className="form-signin">
                        <h4 style={{color: '#3f51b5'}}>Fill the waybill:</h4>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div>
                                <div className="form-group">
                                    <FormikField obj={object.onChangeNumber}
                                                 name={WbNumberField.name}
                                                 label={WbNumberField.label}
                                                 type={WbNumberField.type}
                                    />
                                </div>
                                <div className="form-group">
                                    <FormikField obj={object.onChangeShipper}
                                                 name={WbShipperField.name}
                                                 label={WbShipperField.label}
                                                 type={WbShipperField.type}/>
                                </div>
                                <div className="form-group">
                                    <FormikField obj={object.onChangeConsignee}
                                                 name={WbConsigneeField.name}
                                                 label={WbConsigneeField.label}
                                                 type={WbConsigneeField.type}/>
                                </div>
                                <div className="form-group" style={{marginTop: 20}}>
                                    <div className="FormikField ">
                                        <label style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            color: 'grey',
                                            fontSize: 16,
                                            alignItems: 'right',
                                            justifyContent: 'right'
                                        }}>Driver</label>
                                        <Field style={{minWidth: 250, fontSize: 15}} name="driverId"
                                               as="select"
                                               label="Driver"
                                               placeholder="Driver's name"
                                               className="form-control"
                                               onSelect={object.onChangeDriver}>
                                            {options}
                                        </Field>
                                    </div>
                                </div>
                            </div>
                            {/*<div style={{color: 'black', textAlign: 'center'}}>*/}
                            {/*    Products Table*/}
                            {/*</div>*/}
                        </div>
                        <br/>
                        <div className='btn-row'>
                            <SubmitButton
                                listener={formProps.isSubmitting}
                                buttonText="Save"
                            />
                            <ReturnButton buttonText="Cancel" returnHandler="BackToMain"/>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}