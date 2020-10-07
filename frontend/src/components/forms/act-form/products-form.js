import React, {useState} from "react";
import {Formik, Form, ErrorMessage} from "formik";
import FormikField from "../../roles/sysadmin/formik-field";
import Button from "@material-ui/core/Button";
import {ProductFormValidation} from "../../parts/validation/act-form-validation";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default (props) => {
    const { initProductState, onSubmit, onClose } = props;
    const [selectedStatus, setSelectedStatus] = useState("");
    const useStyles = makeStyles((theme) => ({
        formControl: {
            marginTop: 20,
            minWidth: "100%",
        }
    }));
    const classes = useStyles();

    const handleSubmit = (values) => {
        const product = {
            id: initProductState.id,
            invoiceId: initProductState.invoiceId,
            productStatus: values.productStatus,
            lostQuantity: values.lostQuantity,
            comment: values.comment,
            currency: initProductState.currency,
            name: initProductState.name,
            quantity: initProductState.quantity,
            quantityMeasure: initProductState.quantityMeasure,
            price: initProductState.price,
            mass: initProductState.mass,
            massMeasure: initProductState.massMeasure,
        };
        product.idx = initProductState.idx;
        onSubmit(product);
    };

    const statuses = ['SPOILED', 'STOLEN', 'CONFISCATED', 'DAMAGED_IN_CRASH'];

    return (
        <Formik
            enableReinitialize
            initialValues={{
                productStatus: selectedStatus,
                lostQuantity: "",
                comment: ""
            }}
            onSubmit={handleSubmit}
            validationSchema={ProductFormValidation}
        >
            {(formProps) => (
                <Form>
                    <FormControl className={classes.formControl}>
                        <ProductStatusSelector formikProps={formProps} statuses={statuses}/>
                    </FormControl>
                    <FormikField
                        formikProps={formProps}
                        id={"lostQuantity"}
                        label={"Lost Quantity"}
                        formikFieldName={"lostQuantity"}
                    />
                    <FormikField
                        formikProps={formProps}
                        id={"comment"}
                        label={"Comment"}
                        formikFieldName={"comment"}
                    />
                    <div className="btn-row">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Fix loss
                        </Button>
                        <Button
                            variant="outlined"
                            color='primary'
                            onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export function ProductStatusSelector(props) {
    const {formikProps, statuses} = props;
    return (
        <React.Fragment>
            <InputLabel style={{fontSize: 13}} id={"status_label"}>
                Select losses category
            </InputLabel>
            <Select
                labelId={"status_label"}
                name={"productStatus"}
                onChange={formikProps.handleChange}
                value={formikProps.values["productStatus"]}
                fullWidth
            >
                {statuses.map(status => {
                    return (
                        <MenuItem
                            key={status}
                            name={"productStatus"}
                            value={status}>
                            {status}
                        </MenuItem>
                    )
                })}
            </Select>
            <label style={{color: "#f50057"}}>
                <ErrorMessage name={"productStatus"}/>
            </label>
        </React.Fragment>
    );
}