import React from 'react';
import logo from './logo.svg';
import LoginForm from './login-form';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    If you are a real full stack...
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React or Die!
                </a>
            </header>
            <div>
                <LoginForm/>
            </div>
        </div>
    );
}

export default App;
