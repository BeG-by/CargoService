import React from "react";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";

export const SuccessBody = withRouter((props) => {
    return (
        <div>
            <h2>
                Operation completed successfully!
            </h2>
            <Button variant="contained"
                    color="primary"
                    disabled={false}
                    onClick={props.history.goBack}>
                Go back
            </Button>
        </div>
    );
})