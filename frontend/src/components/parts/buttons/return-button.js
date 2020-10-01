import Button from "@material-ui/core/Button";
import React from "react";
import {Link} from 'react-router-dom';

export const ReturnButton = (props) => {

    const goBackHandler = () => {
        props.history.goBack();
    }

    const switcher = props.returnHandler;
    let handler;
    let href;
    switch (switcher) {
        case 'NotAuthorized':
            href = "/";
            break;
        case 'NotFound':
        case 'BackToMain':
            href = "/main";
            break;
        case 'NoRights':
            handler = goBackHandler;
            break;
        default:
            href = "/";
            break;
    }

    return (
        <Link to={href} className="link-item-white">
            <Button variant="contained"
                    color="secondary"
                    disabled={false}
                    onClick={handler}>
                {props.buttonText}
            </Button>
        </Link>
    );

}