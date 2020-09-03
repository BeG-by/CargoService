import Button from "@material-ui/core/Button";
import React from "react";

export const CancelButton = (props) => {
    return (
        <Button variant="contained" color="secondary" onClick={props.handleClick}>
            {props.content}
        </Button>
    );
}