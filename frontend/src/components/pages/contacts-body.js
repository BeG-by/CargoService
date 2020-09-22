import React from "react";
import {BodyWrapper} from "./body-wrapper";

//todo content
export const ContactsBody = () => {
    const content = <h2>
        Here are our contacts: ...
    </h2>;

    return content;
}

export default () => <BodyWrapper content={ContactsBody}/>