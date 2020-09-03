import Button from "@material-ui/core/Button";
import React from "react";

export const CancelDnButton = (props) => {
    return (
        <div className="ok-btn">
            <Button variant="contained" color="secondary" onClick={props.handleClick}>
                NO
            </Button>
        </div>
    );
}