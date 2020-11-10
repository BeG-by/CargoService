import React from "react";
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils"
import WelcomeBody from "../components/pages/welcome-body";


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

it("WelcomeBody test", () => {

    act(() => {
        ReactDOM.render(<WelcomeBody/>, container);
    });

    expect(container.querySelector("main h4").textContent).toBe("Welcome!");

});