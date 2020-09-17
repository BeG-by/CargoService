import Typography from "@material-ui/core/Typography";
import React from "react";
import ClientsTable from "../../roles/sysadmin/clients-table";

export default function MainBodySysadmin(props) {
    const classes = props.classes;
    return <div>
        <ClientsTable />
    </div>
}