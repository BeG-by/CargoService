import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import {Link} from 'react-router-dom';

export default class ReturnButton extends Component {
    constructor(props) {
        super(props);
        this.goBackHandler = this.goBackHandler.bind(this);
    }

    goBackHandler() {
        this.props.history.goBack();
    }

    render() {
        const switcher = this.props.returnHandler;
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
                handler = this.goBackHandler;
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
                    {this.props.buttonText}
                </Button>
            </Link>
        );
    }
}