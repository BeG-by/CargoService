import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider>
        <App/>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
