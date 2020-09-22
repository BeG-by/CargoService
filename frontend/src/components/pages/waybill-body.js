import React from "react";
import WaybillForm from "../forms/waybill-form/waybill-form";
import {BodyWrapper} from "./body-wrapper";

export const WaybillBody = () => {
    const content = <div style={{minWidth: 350}}>
        <WaybillForm/>
    </div>

    return content;
}

export default () => <BodyWrapper content={WaybillBody}/>