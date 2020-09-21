import React from "react";
import { Formik, Form } from "formik";
import FormikField from "../../roles/sysadmin/formik-field";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
        >
            {(formProps) => (
                <Form>
                    <FormikField
                        formikProps={formProps}
                        id={"place"}
                        label={"Place"}
                        formikFieldName={"place"}
                    />
                    <Grid style={{ marginTop: 15 }} container justify="space-around">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            color='primary'
                            onClick={handleDelete}>Delete point</Button>
                        <Button variant="contained" onClick={onClose}>
                            Cancel
                        </Button>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};
