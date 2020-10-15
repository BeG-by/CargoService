import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {Form, Formik} from "formik";
import FormikField from "../../parts/util/formik-field";
import CustomDatePicker from "../../roles/admin/custom-date-picker";
import Paper from "@material-ui/core/Paper";
import {withRouter} from "react-router-dom";
import useToast from "../../parts/toast-notification/useToast";
import {handleRequestError, makeRequest, REGISTRATION_URL} from "../../parts/util/request-util";
import "../forms.css"
import {RegistrationValidation} from "../../parts/validation/registartion-form";


export const RegistrationForm = (props) => {

    const [toast, showToast] = useToast();
    const [params, setParams] = useState({code: "", role: ""});


    useEffect(() => {
        let href = window.location.href;
        let url = new URL(href);
        let code = url.searchParams.get("code");
        let role = url.searchParams.get("role");

        if (code === null || code === undefined) {
            props.history.push("/")
        }

        setParams({code: code, role: role})

    }, []);

    return (
        <main>
            <Paper style={{width: 400, marginBottom: 80, padding: 20}}>
                <Formik
                    initialValues={{
                        id: "",
                        password: "",
                        confirm: "",
                        name: "",
                        surname: "",
                        patronymic: "",
                        birthday: "1990-01-01",
                        phone: "",
                        passport: "",
                        country: "",
                        city: "",
                        street: "",
                        house: "",
                        flat: "",
                    }}

                    validationSchema={RegistrationValidation}
                    onSubmit={(values) => {

                        const user = {
                            password: values.password,
                            confirmPassword: values.confirm,
                            name: values.name,
                            surname: values.surname,
                            patronymic: values.patronymic,
                            birthday: values.birthday,
                            phone: values.phone,
                            passport: values.passport,
                            address: {
                                country: values.country,
                                city: values.city,
                                street: values.street,
                                house: values.house,
                                flat: values.flat
                            },
                            activationCode: params.code
                        };


                        if (user.password === user.confirmPassword) {
                            makeRequest("POST", REGISTRATION_URL, user)
                                .then(res => {
                                    showToast(res.data, "success");
                                    setTimeout(() => window.location.href = "/", 2000)
                                })
                                .catch(error => handleRequestError(error, showToast))
                        } else {
                            showToast("Passwords don't match", "error")
                        }

                    }}
                >
                    {(formProps) => {
                        return (
                            <Form>
                                <header className="reg-header">
                                    Registration
                                </header>
                                <FormikField
                                    formikProps={formProps}
                                    id={"password"}
                                    label={"Password"}
                                    formikFieldName={"password"}
                                    type={"password"}
                                />
                                <FormikField
                                    formikProps={formProps}
                                    id={"confirm"}
                                    label={"Confirm password"}
                                    formikFieldName={"confirm"}
                                    type={"password"}
                                />
                                <FormikField
                                    formikProps={formProps}
                                    id={"name"}
                                    label={"Name"}
                                    formikFieldName={"name"}
                                />
                                <FormikField
                                    formikProps={formProps}
                                    id={"surname"}
                                    label={"Surname"}
                                    formikFieldName={"surname"}
                                />
                                <FormikField
                                    formikProps={formProps}
                                    id={"patronymic"}
                                    label={"Patronymic"}
                                    formikFieldName={"patronymic"}
                                />

                                <FormikField
                                    formikProps={formProps}
                                    id={"passport"}
                                    label={"Passport"}
                                    formikFieldName={"passport"}
                                />


                                <CustomDatePicker
                                    formikProps={formProps}
                                    id={"birthday"}
                                    label={"Date of birth"}
                                    formikFieldName={"birthday"}/>
                                <FormikField
                                    formikProps={formProps}
                                    id={"phone"}
                                    label={"Phone"}
                                    formikFieldName={"phone"}
                                />
                                <FormikField
                                    formikProps={formProps}
                                    id={"country"}
                                    label={"Country"}
                                    formikFieldName={"country"}
                                />
                                <FormikField
                                    formikProps={formProps}
                                    id={"city"}
                                    label={"City"}
                                    formikFieldName={"city"}
                                />
                                <FormikField
                                    formikProps={formProps}
                                    id={"street"}
                                    label={"Street"}
                                    formikFieldName={"street"}
                                />
                                <FormikField
                                    formikProps={formProps}
                                    id={"house"}
                                    label={"House"}
                                    formikFieldName={"house"}
                                />
                                <FormikField
                                    formikProps={formProps}
                                    id={"flat"}
                                    label={"Flat"}
                                    formikFieldName={"flat"}
                                />
                                <div style={{textAlign: "center", marginTop: 7, marginBottom: 5}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={formProps.listener}
                                    >
                                        Confirm
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </Paper>
            {toast}
        </main>
    );
};


export default withRouter(RegistrationForm);
