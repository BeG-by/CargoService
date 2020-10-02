import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createStore} from "redux";
import {Provider} from "react-redux"
import {rootReducer} from "./components/store/reducers";
import {BrowserRouter} from "react-router-dom";

const store = createStore(rootReducer);

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
        {/*<button onClick={()=> console.log(store.getState())}>REDUX STATE</button>*/}
    </MuiThemeProvider>,
    document.getElementById('root')
);

