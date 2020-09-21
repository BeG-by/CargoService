import React from "react";

export default function fetchFieldFromObject(obj, prop) {
    if (obj === undefined || obj === null) {
        return;
    }
    let index = prop.indexOf(".");
    if (index > -1) {
        return fetchFieldFromObject(
            obj[prop.substring(0, index)],
            prop.substr(index + 1)
        );
    }
    return obj[prop];
}