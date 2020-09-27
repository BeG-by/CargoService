import Button from "@material-ui/core/Button";
import React from "react";

export const OkButton = (props) => {
    return (
        <Button
            variant="contained"
            color="primary"
            disabled={props.disabled}
            onClick={props.handleClick}>
            {props.content}
        </Button>
    );
}
