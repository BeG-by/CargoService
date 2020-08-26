import React from "react";
import "./App.css";
import {BrowserRouter} from "react-router-dom";
import {Switch} from "react-router-dom";
import {Route} from "react-router-dom";
import interceptors from "../../src/security/Interceptors";
import MainPage from "./main-page/main-page";
import WelcomePage from "./welcome-page/welcome-page";
import NotFound from "./error-page/error-404";
import NotAuthorized from "./error-page/error-401";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <div className="App-body">
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={WelcomePage}/>
                            <Route path="/mainPage" component={MainPage}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
