import Button from "@material-ui/core/Button";
import React from "react";

export function WaybillError(action) {
    return (
        <div className="form-signin">
            <p className="error-text">Something goes wrong</p>
            <Button variant="contained" color="secondary" onClick={action.onClick}>
                back
            </Button>
        </div>);
}