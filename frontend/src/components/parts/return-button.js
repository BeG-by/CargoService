import Button from "@material-ui/core/Button";
import React from "react";

function returnHandler() {
    window.location.href = "/";
}

function goBackHandler() {
    this.props.history.goBack();
}

export const ReturnButton = (props) => {
    const switcher = props.returnHandler;
    let handler;
    switch (switcher) {
        case 'NotAuthorized':
        case 'NotFound':
            handler = returnHandler;
            break;
        case 'NoRights':
            handler = goBackHandler;
            break;
    }
    return (
        <Button variant="contained"
                color="secondary"
                disabled={false}
                onClick={handler}>
            {props.buttonText}
        </Button>
    );
}