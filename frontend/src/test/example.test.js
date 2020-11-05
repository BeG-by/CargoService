import React from "react";
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils"
import {LoginForm} from "../components/forms/login-form/login-form";

// import {LoginForm} from "../components/forms/login-form/login-form";
// import App from "../components/App";
import {TestComponent} from "./example-component";
import WelcomeBody from "../components/pages/welcome-body";


// test("Text should be equals 'Hello world' ", () => {
//     const root = document.createElement("div");
//     ReactDOM.render(<TestComponent/>, root);
//     let text = root.querySelector("h1").textContent;
//     let spanText = root.querySelector("span").textContent;
//     expect(text).toBe("Hello world");
//     expect(spanText).toBe("UUU")
// });


let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("example test", () => {

    act(() => {
        ReactDOM.render(<WelcomeBody/>, container);
    });

    expect(container.querySelector("main h4").textContent).toBe("Welcome!");

})

