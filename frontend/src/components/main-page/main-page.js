import React, {Component} from "react";
import Button from "material-ui/RaisedButton";
import NotAuthorized from "../error-page/error-401";
import {Route} from "react-router-dom";

class MainPage extends Component {
    handleLogout() {
        localStorage.clear();
        window.location.href = "/";
    }

    render() {
        if (localStorage.getItem('authorization') != null
            && localStorage.getItem('authorization').trim()) {
            return (
                <div>
                    <h1>WELCOME TO CARGO MANAGER!</h1>
                    <Button type="submit" onClick={this.handleLogout}>
                        Logout
                    </Button>
                </div>
            );
        } else {
            return <Route component={NotAuthorized}/>;
        }
    }
}

export default MainPage;