import Button from "@material-ui/core/Button";
import React from "react";

export const OkButton = (props) => {
    return (
        <div className="ok-btn">
            <Button variant="contained" color="primary" onClick={props.handleClick}>
                OK
            </Button>
        </div>
    );
}
