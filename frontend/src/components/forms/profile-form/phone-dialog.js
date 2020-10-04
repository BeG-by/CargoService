import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import EditIcon from '@material-ui/icons/Edit';
import DialogContent from "@material-ui/core/DialogContent";
import {handleRequestError, makeRequest, USER_URL} from "../../parts/util/request-util";
import {Form, Formik} from "formik";
import FormikField from "../../parts/util/formik-field";
import {copyUser} from "../../parts/util/function-util";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function ChangePhoneDialog(props) {

    const {changeUser, user, showToastComponent} = props;

    const [phone, setPhone] = useState("");
    const [open, setOpen] = useState(false);


    // useEffect(() => {
    //     setPhone(user.phone)
    // }, [user]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setPhone("");
        setOpen(false);
    };


    return (
        <div>
            <Button
                color="primary"
                startIcon={<EditIcon/>}
                onClick={(e) => {
                    e.stopPropagation();
                    handleClickOpen();
                }}/>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Change phone number</DialogTitle>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            phone: user.phone,
                        }}
                        onSubmit={(values) => {
                            const phone = values.phone;

                            makeRequest("PUT", USER_URL + "/phone", {phone})
                                .then(res => {
                                    showToastComponent("Phone has been updated", "success");
                                    user.phone = phone;
                                    changeUser(copyUser(user));
                                    handleClose();
                                }).catch(error => handleRequestError(error, showToastComponent))

                        }}
                    >
                        {(formProps) => {
                            return (
                                <Form>
                                    <FormikField
                                        formikProps={formProps}
                                        id={"phone"}
                                        label={"Phone"}
                                        formikFieldName={"phone"}
                                    />
                                    <DialogActions>
                                        <Button
                                            color="primary"
                                            type="submit"
                                            disabled={formProps.listener}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            onClick={handleClose}
                                            color="primary">
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </Form>
                            );
                        }}
                    </Formik>

                </DialogContent>
            </Dialog>
        </div>
    );
}