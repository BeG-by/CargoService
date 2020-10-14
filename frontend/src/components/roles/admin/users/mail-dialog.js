import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {ErrorMessage, Field, Form, Formik} from "formik";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "./mail.css";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import {UserTemplateSelector} from "./user-selectors";
import {EMAIL_URL, handleRequestError, makeRequest, TEMPLATES_URL} from "../../../parts/util/request-util";


const ValidationMessage = Yup.object({
    message: Yup.string()
        .required("Text is required")
        .max(2500, "Max length must be lesser than 2500 symbols")
});

const ValidationSubject = Yup.object({
    subject: Yup.string()
        .required("Subject is required")
        .max(64, "Max length must be lesser than 64 symbols")
});


export const MailDialog = (props) => {
    const {open, onClose, showToast, emails} = props;
    const [templateContent, setTemplateContent] = useState({});
    const [selectedTemplate, setSelectedTemplate] = useState("");


    useEffect(() => {
        makeRequest("GET", TEMPLATES_URL)
            .then(res => setTemplateContent(res.data))
            .catch(error => handleRequestError(error, showToast))

    }, []);


    const handleClose = () => {
        setSelectedTemplate("");
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
                    <span id="form-title">Email</span>
                    <IconButton aria-label="close"
                                onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        validationSchema={selectedTemplate === "" ?
                            ValidationSubject.concat(ValidationMessage) :
                            ValidationSubject}
                        initialValues={{
                            message: "",
                            subject: "",
                            template: "",
                        }}
                        onSubmit={(values) => {

                            const data = {
                                emails: Array.from(emails),
                                subject: values.subject,
                            };

                            if (selectedTemplate === "") {
                                data.text = values.message;
                                makeRequest("POST", EMAIL_URL, data)
                                    .then(res => {
                                        showToast("Emails have been successfully sent");
                                        handleClose()
                                    })
                                    .catch(error => handleRequestError(error, showToast))

                            } else {
                                data.type = values.template;
                                makeRequest("POST", EMAIL_URL + "/template", data)
                                    .then(res => {
                                        showToast("Emails have been successfully sent");
                                        handleClose()
                                    })
                                    .catch(error => handleRequestError(error, showToast))
                            }

                        }}
                    >
                        {(formProps) => {
                            return (
                                <Form style={{width: 550}}>
                                    <div>
                                        <TextField
                                            id={"subject"}
                                            label={"Subject"}
                                            margin="dense"
                                            name="subject"
                                            onChange={formProps.handleChange}
                                            onBlur={formProps.handleBlur}
                                            value={formProps.values["subject"]}
                                            style={{width: 200, marginBottom: 10}}

                                        />
                                    </div>
                                    <div style={{marginTop: 0, marginBottom: 5}}>
                                        <label className="error-message">
                                            <ErrorMessage name="subject"/>
                                        </label>
                                    </div>
                                    <div style={{marginTop: 0, marginBottom: 5}}>
                                        <UserTemplateSelector
                                            formikProps={formProps}
                                            id={"template"}
                                            label={"Template"}
                                            formikFieldName={"template"}
                                            onSelect={setSelectedTemplate}
                                            templates={templateContent}
                                        />
                                    </div>

                                    <div style={{textAlign: "left"}}>
                                        {selectedTemplate === "" ?
                                            <React.Fragment>
                                                <Field as="textarea"
                                                       id="message"
                                                       name="message"
                                                       onChange={formProps.handleChange}
                                                       onBlur={formProps.handleBlur}
                                                       value={formProps.values["message"]}
                                                       maxlength={2501}
                                                       className="mail-text"
                                                       placeHolder="You can write message here..."
                                                       fullWidth
                                                />
                                                < label className="error-message">
                                                    < ErrorMessage name="message"/>
                                                </label>
                                            </React.Fragment>
                                            : <div dangerouslySetInnerHTML={{__html: selectedTemplate}}/>
                                        }
                                    </div>

                                    <div style={{textAlign: "center", marginTop: 10, marginBottom: 5}}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={formProps.listener}
                                        >
                                            Send
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
