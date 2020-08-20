import React, { Component } from "react";

class MainPage extends Component {
    handleLogout() {
        // localStorage.clear();
        window.location.href = "/";
    }

    render() {
        return (
            <div>
                <h1>WELCOME TO CARGO MANAGER!</h1>

                <a
                    href="javascript:void(0);"
                    onClick={this.handleLogout}
                    className="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                    <span style={{ color: "white" }}>Logout</span>
                </a>
            </div>
        );
    }
}
export default MainPage;