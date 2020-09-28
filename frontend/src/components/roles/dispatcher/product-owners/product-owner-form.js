import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormikField from "../formik-field";
import DeleteIcon from '@material-ui/icons/Delete';

import {Formik, Form} from "formik";
import {
    makeDeleteProductOwnerRequest,
    makeSaveProductOwnerRequest,
    makeUpdateProductOwnerRequest,
    makeGetProductOwnerByIdRequest,
} from "../request-utils";
import useToast from "../../../parts/toast-notification/useToast";
import ProductOwnerTypeSelector from "./product-owner-type-selector";
import FormDatePicker from "../form-date-picker";
import {ProductFormValidationSchema} from "./validation-shema";

const EMPTY_PRODUCT_OWNER = {
    id: -1,
    name: "",
    payerAccountNumber: "",
    type: "SP",
    phone: "",
    address: {country: "", city: "", street: "", house: "", flat: ""},
    registrationDate: new Date(),
};

function parseProductOwner(values) {
    return {
        name: values.name,
        type: values.companyType,
        phone: values.phone,
        address: {
            country: values.country,
            city: values.city,
            street: values.street,
            house: values.house,
            flat: values.flat,
        },
        registrationDate: values.registrationDate,
    };
}

export default function ProductOwnerForm(props) {
    const {onClose} = props;
    const [productOwner, setProductOwner] = useState(EMPTY_PRODUCT_OWNER);
    const [toast, openToast] = useToast();

    useEffect(() => {
        if (props.productOwnerId !== -1) {
            getProductOwnerById(props.productOwnerId);
        }
    }, [props.productOwnerId]);


    async function getProductOwnerById(id) {
        try {
            const response = await makeGetProductOwnerByIdRequest(id);
            setProductOwner(response.data);
        } catch (error) {
            handleRequestError(error);
        }
    }

    async function saveProductOwner(client) {
        try {
            await makeSaveProductOwnerRequest(client);
            openToast("Product owner has been saved", "success");
            setProductOwner(EMPTY_PRODUCT_OWNER);
            handleClose();
        } catch (error) {
            handleRequestError(error);
        }
    }

    async function updateProductOwner(productOwner) {
        productOwner.id = props.productOwnerId;
        try {
            await makeUpdateProductOwnerRequest(productOwner);
            openToast("Client has been updated", "success");
            setProductOwner(EMPTY_PRODUCT_OWNER);
            handleClose();
        } catch (error) {
            handleRequestError(error);
        }
    }

    async function deleteProductOwner() {
        try {
            await makeDeleteProductOwnerRequest(props.productOwnerId);
            openToast("Client has been deleted", "success");
            setProductOwner(EMPTY_PRODUCT_OWNER);
            handleClose()
        } catch (error) {
            handleRequestError(error);
        }
    }

    function handleRequestError(error) {
        if (error.response.status < 500) {
            openToast(error.response.data, "error");
        } else {
            openToast("Cannot get response from server", "error");
        }
    }

    const handleClose = () => {
        setProductOwner(EMPTY_PRODUCT_OWNER);
        onClose();
    };

    const handleSubmit = (values) => {
        const productOwner = parseProductOwner(values);
        if (props.productOwnerId === -1) {
            saveProductOwner(productOwner);
        } else {
            updateProductOwner(productOwner);
        }
    };

    const handleDelete = () => {
        if (props.productOwnerId !== -1) {
            deleteProductOwner();
        }
    };

    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                initialValues={{
                    name: productOwner.name,
                    companyType: productOwner.type,
                    phone: productOwner.phone,
                    country: productOwner.address.country,
                    city: productOwner.address.city,
                    street: productOwner.address.street,
                    house: productOwner.address.house,
                    flat: productOwner.address.flat,
                    registrationDate: productOwner.registrationDate,
                }}
                onSubmit={handleSubmit}
                validationSchema={ProductFormValidationSchema}
            >
                {(formProps) => (
                    <Form>
                        <FormikField
                            formikProps={formProps}
                            id={"name"}
                            label={"Name"}
                            formikFieldName={"name"}
                        />
                        <FormikField
                            formikProps={formProps}
                            id={"phone"}
                            label={"Phone"}
                            formikFieldName={"phone"}
                        />
                        <FormDatePicker
                            formikProps={formProps}
                            id="registrationDate"
                            formikFieldName="registrationDate"
                            label="Registration date"
                        />
                        <ProductOwnerTypeSelector
                            formikProps={formProps}
                            id="companyType"
                            formikFieldName="companyType"
                            label="Company type"
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
                        <Grid
                            style={{marginTop: 15}}
                            container
                            justify="space-around"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={formProps.listener}
                            >
                                {props.productOwnerId === -1 ? "Save" : "Update"}
                            </Button>
                            {props.productOwnerId === -1 ? "" :
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleDelete}
                                    startIcon={<DeleteIcon/>}
                                >
                                    Delete
                                </Button>
                            }
                        </Grid>
                    </Form>
                )}
            </Formik>
            {toast}
        </React.Fragment>
    );
}
