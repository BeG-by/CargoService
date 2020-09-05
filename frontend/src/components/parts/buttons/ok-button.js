import Button from "@material-ui/core/Button";
import React from "react";

export const OkButton = (props) => {
    return (
        <Button variant="contained" color="primary" onClick={props.handleClick}>
            {props.content}
        </Button>
    );
}
