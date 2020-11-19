import React, {useEffect} from "react";
import WelcomeBody from "./welcome-body";

export function TokenParser() {

    useEffect(() => {
        let href = window.location.href;
        let url = new URL(href);
        let token = url.searchParams.get("token");
        localStorage.setItem("authorization", token);
        window.location.href = "http://localhost:3000/main";
    });

    return <WelcomeBody/>;
}