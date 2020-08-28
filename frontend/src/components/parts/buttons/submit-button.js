import Button from "@material-ui/core/Button";
import React from "react";

export const SubmitButton = (props) => {
    return (
        <Button variant="contained"
                color="primary"
                type="submit"
                disabled={props.listener}>
            {props.buttonText}
        </Button>
    );
}