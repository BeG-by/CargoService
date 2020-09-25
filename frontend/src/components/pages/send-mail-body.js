import React from "react";
import {BodyWrapper} from "./body-wrapper";

//todo inner content
export const SendMailBody = () => {
    const content = <h2>
        Here you can send message to iTechArt support team.
    </h2>;

    return content;
}

export default () => <BodyWrapper content={SendMailBody}/>