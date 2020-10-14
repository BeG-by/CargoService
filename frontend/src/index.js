import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createStore} from "redux";
import {Provider} from "react-redux"
import {rootReducer} from "./components/store/reducers";
import {BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from "notistack";

const store = createStore(rootReducer);

ReactDOM.render(
    <MuiThemeProvider>
        <SnackbarProvider
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            maxSnack={5}
        >
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </SnackbarProvider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

