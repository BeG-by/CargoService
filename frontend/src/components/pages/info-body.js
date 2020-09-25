import React from "react";
import {BodyWrapper} from "./body-wrapper";

export const InfoBody = () => {
    //todo content
    const content = <h2>
        Very interesting and useful information about the application, it's full of eternal shine
        and marvelous glory, splendid facts and high definition photos of little fluffy puppies, blah-blah-blah...
    </h2>;

    return content;

}

export default () => <BodyWrapper content={InfoBody}/>