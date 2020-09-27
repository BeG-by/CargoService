import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Form, Formik} from "formik";
import FormikField from "./formik-field";
import {findUserById, saveUser, updateUser} from "./request-util";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import UserDatePicker from "./user-date-picker";
import {UserTypeSelector, UserStatusSelector} from "./user-selectors";


const EMPTY_USER = {
    id: -1,
    login: "",
    password: "",
    name: "",
    surname: "",
    patronymic: "",
    passport: "",
    roles: [],
    birthday: "",
    address: {
        country: "",
        city: "",
        street: "",
        house: "",
        flat: ""
    },
    email: "",
    status: ""
};


export const UserDialog = (props) => {
    const {open, onClose, userId, refreshTable, showToast, handleError} = props;
    const [user, setUser] = useState(EMPTY_USER);

    const isUpdateForm = props.userId >= 0;

    useEffect(() => {

        if (isUpdateForm) {
            findUserById(props.userId)
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
                }).catch(error => handleError(error))
        }
    }, [props.userId]);

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
                    <span id="form-title">User Form</span>
                    <IconButton aria-label="close"
                                onClick={handleClose}
                                className="close-user-dialog-btn"
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            id: userId,
                            login: user.login,
                            password: user.password,
                            name: user.name,
                            surname: user.surname,
                            patronymic: user.patronymic,
                            role: user.roles,
                            birthday: user.birthday,
                            email: user.email,
                            passport: user.passport,
                            status: user.status,
                            country: user.address.country,
                            city: user.address.city,
                            street: user.address.street,
                            house: user.address.house,
                            flat: user.address.flat,
                        }}
                        onSubmit={(values) => {

                            const user = {
                                login: values.login,
                                password: values.password,
                                name: values.name,
                                surname: values.surname,
                                patronymic: values.patronymic,
                                roles: [values.role],
                                birthday: values.birthday,
                                email: values.email,
                                passport: values.passport,
                                address: {
                                    country: values.country,
                                    city: values.city,
                                    street: values.street,
                                    house: values.house,
                                    flat: values.flat
                                }
                            };

                            if (isUpdateForm) {

                                user.id = values.id;
                                user.status = values.status;

                                updateUser(user)
                                    .then(res => {
                                        handleClose();
                                        refreshTable();
                                        showToast("User has been updated", "success")
                                    })
                                    .catch(error => {
                                        handleError(error)
                                    })
                            } else {

                                saveUser(user)
                                    .then(res => {
                                        handleClose();
                                        refreshTable();
                                        showToast("User has been created", "success")
                                    })
                                    .catch(error => {
                                        handleError(error)
                                    })
                            }

                        }}
                    >
                        {(formProps) => {
                            return (
                                <Form>
                                    <FormikField
                                        formikProps={formProps}
                                        id={"login"}
                                        label={"Login"}
                                        formikFieldName={"login"}
                                    />
                                    <FormikField
                                        formikProps={formProps}
                                        id={"password"}
                                        label={"Password"}
                                        formikFieldName={"password"}
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
                                    <UserTypeSelector
                                        formikProps={formProps}
                                        id={"role"}
                                        label={"Role"}
                                        formikFieldName={"role"}
                                    />

                                    {isUpdateForm ? <UserStatusSelector
                                        formikProps={formProps}
                                        id={"status"}
                                        label={"Status"}
                                        formikFieldName={"status"}
                                    /> : ""}

                                    <UserDatePicker
                                        formikProps={formProps}
                                        id={"birthday"}
                                        label={"Date of birth"}
                                        formikFieldName={"birthday"}/>
                                    <FormikField
                                        formikProps={formProps}
                                        id={"email"}
                                        label={"Email"}
                                        formikFieldName={"email"}
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
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={formProps.listener}
                                    >
                                        {isUpdateForm ? "Update" : "Save"}
                                    </Button>
                                </Form>
                            );
                        }}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
}
