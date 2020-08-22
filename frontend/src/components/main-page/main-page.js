import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";

class MainPage extends Component {
    handleLogout() {
        // localStorage.clear();
        window.location.href = "/";
    }

    render() {
        return (
            <div>
                <h1>WELCOME TO CARGO MANAGER!</h1>
                <RaisedButton type="submit" onClick={this.handleLogout}>
                    Logout
                </RaisedButton>
            </div>
        );
    }
}
export default MainPage;