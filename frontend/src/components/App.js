import React from "react";
import "./App.css";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom";
import interceptors from "../../src/security/Interceptors";
import MainPage from "./main-page/main-page";
import WelcomePage from "./welcome-page/welcome-page";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <div className="App-body">
                    <BrowserRouter>
                        <Route exact path="/" component={WelcomePage}/>
                        <Route exact path="/mainPage" component={MainPage}/>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
