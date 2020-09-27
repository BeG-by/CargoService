import React from "react";
import { Formik, Form } from "formik";
import FormikField from "../../roles/sysadmin/formik-field";
import Button from "@material-ui/core/Button";
import {PointFormValidation} from "../../parts/validation/waybill-form-validation";

export default (props) => {
    const { initPointState, onSubmit, onClose, onDelete } = props;

    const handleSubmit = (values) => {
        let pointId;
        if (initPointState.id === 0) {
            pointId = null;
        } else {
            pointId = initPointState.id;
        }
        const point = {
            place: values.place,
            passed: values.passed,
            passageDate: values.passageDate,
            waybillId: values.waybillId,
            id: pointId
        };
        point.idx = initPointState.idx;
        onSubmit(point);
    };

    const handleDelete = () => {
        onDelete(initPointState.idx);
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initPointState}
            onSubmit={handleSubmit}
            validationSchema={PointFormValidation}
        >
            {(formProps) => (
                <Form>
                    <FormikField
                        formikProps={formProps}
                        id={"place"}
                        label={"Place"}
                        formikFieldName={"place"}
                    />
                    <div className="btn-row">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Add
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"

                            onClick={handleDelete}>Delete</Button>
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
