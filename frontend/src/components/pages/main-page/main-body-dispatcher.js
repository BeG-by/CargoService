import React, {useState} from 'react';
import MaterialTable from 'material-table';
import DeliveryNoteForm from "../../forms/ttn-form/delivery-note-form";
import {getDriversByCompanyId, getClientsByCompanyId} from "../../../request-api/utils";

function handleRegisterDeliveryNoteClick(deliveryNote) {
    alert("Registered")
    //todo: send delivery note to backend
}

const columns = [
    {title: 'Name', field: 'name'},
    {title: 'Address', field: 'address'},
    {title: 'Phone', field: 'phone'},
    {title: 'Contact', field: 'contact'}
];

export default function MainBodyDispatcher() {
    const user = {
        name: "Vladislav",
        lastName: "Lemeshkov",
        patronymic: "Vladimirovich",
        companyId: 1,

        //todo: fix this shit
        jwtToken: localStorage.getItem("authorization")
    }

    const drivers = getDriversByCompanyId(user.companyId)
    const clients = getClientsByCompanyId(user.companyId)

    const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false);
    const [client, setClient] = useState({});

    return (
        <div>
            <MaterialTable
                onRowClick={(event, rowData, toggleDetailPanel) => {
                    console.log(rowData)
                    setClient(rowData)
                    setDeliveryDialogOpen(true)
                }}
                title="Clients"
                columns={columns}
                data={clients}
            />

            <DeliveryNoteForm
                open={deliveryDialogOpen}
                onCloseClick={() => setDeliveryDialogOpen(false)}
                onRegisterClick={handleRegisterDeliveryNoteClick}

                name={user.name}
                lastName={user.lastName}
                patronymic={user.patronymic}
                drivers={drivers}

                //todo: set via special methods
                clientCompany={client}
            />
        </div>
    );
}