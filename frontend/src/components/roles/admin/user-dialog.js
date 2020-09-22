import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Form, Formik} from "formik";
import FormikField from "./formik-field";
import {getUserById, updateUser} from "./request-util";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import UserDatePicker from "./user-date-picker";
import UserTypeSelector from "./user-role-selector";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


const EMPTY_USER = {
    id: -1,
    login: "",
    password: "",
    name: "",
    surname: "",
    patronymic: "",
    roles: "",
    birthday: "",
    address: {
        country: "",
        city: "",
        street: "",
        house: "",
    },
    email: ""
};


const UserDialog = (props) => {
    const {open, onClose, userId} = props;
    const [user, setUser] = useState(EMPTY_USER);

    useEffect(() => {
        if (props.userId >= 0) {
            getUserById(props.userId)
                .then(res => {
                    if (res.data.address === null) {
                        res.data.address = {
                            country: "",
                            city: "",
                            street: "",
                            house: "",
                        }
                    }
                    console.log(res.data)
                    setUser(res.data);
                })
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
                            password: "",
                            name: user.name,
                            surname: user.surname,
                            patronymic: user.patronymic,
                            role: user.roles,
                            birthday: user.birthday,
                            email: user.email,
                            country: user.address.country,
                            city: user.address.city,
                            street: user.address.street,
                            house: user.address.house,
                        }}
                        onSubmit={(values) => {

                            const user = {
                                id: values.id,
                                login: values.login,
                                password: "",
                                name: values.name,
                                surname: values.surname,
                                patronymic: values.patronymic,
                                roles: values.role,
                                birthday: values.birthday,
                                email: values.email,
                                address: {
                                    country: values.country,
                                    city: values.city,
                                    street: values.street,
                                    house: values.house
                                }
                            }

                            console.log(user)

                            updateUser(user)
                                .then(props.history.push("/main"))
                                .catch(error => alert(error + error.data))


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
                                    <UserTypeSelector
                                        formikProps={formProps}
                                        id={"role"}
                                        label={"Role"}
                                        formikFieldName={"role"}
                                    />
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
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={formProps.listener}
                                    >
                                        Submit
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


export default withRouter(UserDialog)
