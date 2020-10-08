import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormikField from "../../../parts/util/formik-field";
import {Formik, Form} from "formik";
import ProductOwnerTypeSelector from "./product-owner-type-selector";
import CustomDatePicker from "../../../parts/util/custom-date-picker";
import {ProductFormValidationSchema} from "../../../parts/validation/product-owner-validation";
import {makeRequest, OWNER_URL, handleRequestError} from "../../../parts/util/request-util";

const EMPTY_PRODUCT_OWNER = {
    id: -1,
    name: "",
    payerAccountNumber: "",
    type: "",
    phone: "",
    address: {country: "", city: "", street: "", house: "", flat: ""},
    registrationDate: "2000-01-01",
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
    const {onClose, openToast} = props;
    const [productOwner, setProductOwner] = useState(EMPTY_PRODUCT_OWNER);

    useEffect(() => {
        if (props.productOwnerId !== -1) {
            getProductOwnerById(props.productOwnerId);
        }
    }, [props.productOwnerId]);


    async function getProductOwnerById(id) {
        try {
            const response = await makeRequest("GET", OWNER_URL + "/" + id);
            setProductOwner(response.data);
        } catch (error) {
            handleRequestError(error, openToast);
        }
    }

    async function saveProductOwner(client) {
        try {
            await makeRequest("POST", OWNER_URL, client);
            openToast("Client has been saved", "success");
            setProductOwner(EMPTY_PRODUCT_OWNER);
            handleClose();
        } catch (error) {
            handleRequestError(error, openToast);
        }
    }

    async function updateProductOwner(productOwner) {
        productOwner.id = props.productOwnerId;
        try {
            await makeRequest("PUT", OWNER_URL, productOwner);
            openToast("Client has been updated", "success");
            setProductOwner(EMPTY_PRODUCT_OWNER);
            handleClose();
        } catch (error) {
            handleRequestError(error, openToast);
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


    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                validationSchema={ProductFormValidationSchema}
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
            >
                {(formProps) => (
                    <Form style={{width: 450}}>
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
                        <CustomDatePicker
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
                                style={{width: 120}}
                            >
                                {props.productOwnerId === -1 ? "Save" : "Update"}
                            </Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
}
