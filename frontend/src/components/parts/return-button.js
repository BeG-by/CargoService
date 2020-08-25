import Button from "@material-ui/core/Button";
import React from "react";

function returnHandler() {
    window.location.href = "/";
}

function goMainHandler() {
    window.location.href = "/mainPage";
}

//fixme привязать к истории переходов
function goBackHandler() {
    this.props.history.goBack();
}

export const ReturnButton = (props) => {
    const switcher = props.returnHandler;
    let handler;
    switch (switcher) {
        case 'NotAuthorized':
            handler = returnHandler;
            break;
        case 'NotFound':
            handler = goMainHandler;
            break;
        case 'NoRights':
            handler = goBackHandler;
            break;
        default:
            handler = returnHandler;
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