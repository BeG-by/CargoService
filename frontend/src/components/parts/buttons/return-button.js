import Button from "@material-ui/core/Button";
import React, {Component} from "react";

export default class ReturnButton extends Component {
    constructor(props) {
        super(props);
        this.goBackHandler = this.goBackHandler.bind(this);
        this.returnHandler = this.returnHandler.bind(this);
        this.goMainHandler = this.goMainHandler.bind(this);
    }

    goBackHandler() {
        this.props.history.goBack();
    }

    returnHandler() {
        window.location.href = "/";
    }

    goMainHandler() {
        window.location.href = "/mainPage";
    }

    render () {
        const switcher = this.props.returnHandler;
        let handler;
        switch (switcher) {
            case 'NotAuthorized':
                handler = this.returnHandler;
                break;
            case 'NotFound':
                handler = this.goMainHandler;
                break;
            case 'NoRights':
                handler = this.goBackHandler;
                break;
            default:
                handler = this.returnHandler;
                break;
        }
        return (
            <Button variant="contained"
                    color="secondary"
                    disabled={false}
                    onClick={handler}>
                {this.props.buttonText}
            </Button>
        );
    }
}