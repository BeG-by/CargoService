import React from "react";
import {Text, View} from "react-native";
import LoginForm from "./components/forms/login-form/LoginForm"
import {NativeRouter, Switch, Route, Link, BackButton} from "react-router-native";
import {UserInfo} from "./components/forms/login-form/UserInfo"
import {createStore} from "redux";
import {rootReducer} from "./components/store/reducers";
import {Provider} from "react-redux";

const store = createStore(rootReducer)

export default function AndroidApp() {
    return (
        <View>
            <Provider store={store}>
                <NativeRouter>
                    <Switch>
                        <BackButton>
                            <Route exact path={"/"} render={props => <LoginForm {...props}/>}/>
                            <Route path={"/user-info"} render={props => <UserInfo {...props}/>}/>
                        </BackButton>
                    </Switch>
                </NativeRouter>
            </Provider>
        </View>)
}
