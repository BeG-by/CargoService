import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Form, Formik} from "formik";
import FormikField from "../../../parts/util/formik-field";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CustomDatePicker from "../custom-date-picker";
import {UserTypeSelector, UserStatusSelector} from "./user-selectors";
import {USER_URL, handleRequestError, makeRequest} from "../../../parts/util/request-util"
import {PasswordNotRequiredScheme, UpdateUserScheme} from "../../../parts/validation/user-validation";
import {LinkScheme} from "../../../parts/validation/activation-link-form-validation";


const EMPTY_USER = {
    id: -1,
    email: "",
    password: "",
    name: "",
    surname: "",
    patronymic: "",
    passport: "",
    roles: "",
    birthday: "2000-01-01",
    address: {
        country: "",
        city: "",
        street: "",
        house: "",
        flat: ""
    },
    phone: "",
    status: ""
};


export const UserDialog = (props) => {
    const {open, onClose, userId, refreshTable, showToast} = props;
    const [user, setUser] = useState(EMPTY_USER);

    const TITLE = "User";

    const isUpdateForm = userId >= 0;

    useEffect(() => {

        if (isUpdateForm) {
            makeRequest("GET", USER_URL + "/" + userId)
                .then(res => {
                    const user = res.data;

                    if (user.address === null) {
                        user.address = {
                            country: "",
                            city: "",
                            street: "",
                            house: "",
                            flat: ""
                        }
                    }

                    user.roles = user.roles[0];

                    setUser(res.data);
                }).catch(error => handleRequestError(error, showToast))
        }
    }, [userId]);

    const handleClose = () => {
        setUser(EMPTY_USER);
        onClose();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <span id="form-title">{TITLE}</span>
                    <IconButton aria-label="close"
                                onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        validationSchema={isUpdateForm ? UpdateUserScheme.concat(PasswordNotRequiredScheme) : LinkScheme}
                        initialValues={{
                            id: userId,
                            email: user.email,
                            password: user.password,
                            name: user.name,
                            surname: user.surname,
                            patronymic: user.patronymic,
                            role: user.roles,
                            birthday: user.birthday,
                            phone: user.phone,
                            passport: user.passport,
                            status: user.status,
                            country: user.address.country,
                            city: user.address.city,
                            street: user.address.street,
                            house: user.address.house,
                            flat: user.address.flat,
                        }}
                        onSubmit={(values) => {

                            if (isUpdateForm) {

                                const user = {
                                    id: values.id,
                                    email: values.email,
                                    password: values.password,
                                    name: values.name,
                                    surname: values.surname,
                                    patronymic: values.patronymic,
                                    roles: [values.role],
                                    birthday: values.birthday,
                                    phone: values.phone,
                                    passport: values.passport,
                                    status: values.status,
                                    address: {
                                        country: values.country,
                                        city: values.city,
                                        street: values.street,
                                        house: values.house,
                                        flat: values.flat
                                    }
                                };

                                makeRequest("PUT", USER_URL, user)
                                    .then(res => {
                                        handleClose();
                                        refreshTable();
                                        showToast("User has been updated", "success")
                                    })
                                    .catch(error => handleRequestError(error, showToast))

                            } else {

                                const data = {
                                    email: values.email,
                                    role: values.role
                                };


                                makeRequest("POST", USER_URL, data)
                                    .then(res => {
                                        handleClose();
                                        showToast("Link has been send", "success")
                                    })
                                    .catch(error => handleRequestError(error, showToast))
                            }

                        }}
                    >
                        {(formProps) => {
                            return (
                                <Form style={{width: 400}}>
                                    {isUpdateForm ? "" :
                                        <FormikField
                                            formikProps={formProps}
                                            id={"email"}
                                            label={"Email"}
                                            formikFieldName={"email"}
                                        />}

                                    {isUpdateForm ?
                                        <span>
                                        < FormikField
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
                                        </span>
                                        : ""}

                                    <UserTypeSelector
                                        formikProps={formProps}
                                        id={"role"}
                                        label={"Role"}
                                        formikFieldName={"role"}
                                    />

                                    {isUpdateForm ?
                                        <span>
                                            <UserStatusSelector
                                                formikProps={formProps}
                                                id={"status"}
                                                label={"Status"}
                                                formikFieldName={"status"}
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
                                            <FormikField
                                                formikProps={formProps}
                                                id={"password"}
                                                label={"Password"}
                                                formikFieldName={"password"}
                                                type={"password"}
                                            />
                                        </span>
                                        : ""}

                                    <div style={{textAlign: "center", marginTop: 10, marginBottom: 5}}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={formProps.listener}
                                        >
                                            {isUpdateForm ? "Update" : "Send activation link"}
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
};
