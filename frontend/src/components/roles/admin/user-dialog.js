import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Form, Formik} from "formik";
import FormikField from "./formik-field";
import {getUserById} from "./request-util";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";


const EMPTY_USER = {
    id: -1,
    name: "",
    surname: "",
    patronymic: "",
    birthday: "",
    address: {
        country: "",
        city: "",
        street: "",
        house: "",
    },
    email: ""
};


export default (props) => {
    const {open, onClose} = props;
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
                            name: user.name,
                            surname: user.surname,
                            patronymic: user.patronymic,
                            email: user.email,
                            country: user.address.country,
                            city: user.address.city,
                            street: user.address.street,
                            house: user.address.house,
                            // registration_date: user.registrationDate,
                        }}
                        onSubmit={(values) => {
                            console.log("Submitted");
                            console.log(values);
                        }}
                    >
                        {(formProps) => {
                            return (
                                <Form>
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
                                        id={"House"}
                                        label={"House"}
                                        formikFieldName={"house"}
                                    />
                                    {/*<FormikField*/}
                                    {/*    formikProps={formProps}*/}
                                    {/*    id={"registration_date"}*/}
                                    {/*    label={"Registration date"}*/}
                                    {/*    formikFieldName={"registration_date"}*/}
                                    {/*/>*/}
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
