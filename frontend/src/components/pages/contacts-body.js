import React from "react";
import {BodyWrapper} from "./body-wrapper";

//todo content
export const ContactsBody = () => {
    return <h2>
        Here are our contacts: ...
    </h2>;
}

export default () => <BodyWrapper content={ContactsBody}/>