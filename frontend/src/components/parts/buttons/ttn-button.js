import Button from "@material-ui/core/Button";
import {DialogWindow} from "../dialog";
import React from "react";
import TtnForm from "../../forms/ttn-form/ttn-form";

export const TtnButton = (props) => {
    const form = <TtnForm/>;
    return (
        <div className="ttn-btn">
            <Button color="primary" onClick={props.handleClickOpen}>
                {props.name}
            </Button>
            <DialogWindow
                dialogTitle="Fill TTN:"
                handleClose={props.handleClose}
                openDialog={props.openDialog}
                form={form}/>
        </div>
    );
}