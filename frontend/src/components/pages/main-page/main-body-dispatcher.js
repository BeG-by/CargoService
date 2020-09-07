import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import DeliveryNoteCreatingForm from "../../forms/delivery-note-form/delivery-note-creating-form";
import ItemList from "../../parts/lists/item-list";
import {
  getDriversByCompanyId,
  getClientsByCompanyId,
  getRejectedDeliveryNotesByDispatcherId,
} from "../../../request-api/utils";

const columns = [
  { title: "Name", field: "name" },
  { title: "Address", field: "address" },
  { title: "Phone", field: "phone" },
  { title: "Contact", field: "contact" },
];

export default function MainBodyDispatcher() {
  const user = {
    id: 1,
    name: "Vladislav",
    lastName: "Reznov",
    patronymic: "Vladimirovich",
    company: {
      id: 1,
      name: "BestCargo",
      pan: "S32YY3213",
    },

    //todo: fix this shit
    jwtToken: localStorage.getItem("authorization"),
  };

  const defaultDeliveryNote = {
    clientCompany: {},
    dispatcher: {
      name: user.name,
      lastName: user.lastName,
      patronymic: user.patronymic,
    },
    index: "",
    fromAddress: "",
    toAddress: "",
    carrierCompany: user.company,
    driver: {},
    products: [],
  };

  const [clients, setClients] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setClients(await getClientsByCompanyId());
      setDrivers(await getDriversByCompanyId());
    }
    fetchData();
  }, []);

  const rejectedDeliveryNotes = getRejectedDeliveryNotesByDispatcherId(user.id);

  const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false);
  const [currentDeliveryNote, setCurrentDeliveryNote] = useState(
    defaultDeliveryNote
  );

  const handleRegisterDeliveryNoteClick = (deliveryNote) => {
    setDeliveryDialogOpen(false);
    alert("Registered");
  };

  const handleOnClientsTableRowClick = (clientData) => {
    setCurrentDeliveryNote({
      clientCompany: clientData,
      dispatcher: {
        name: user.name,
        lastName: user.lastName,
        patronymic: user.patronymic,
      },
      index: "",
      fromAddress: "",
      toAddress: "",
      carrierCompany: user.company,
      driver: { name: "", lastName: "", passport: "" },
      products: [],
    });
    setDeliveryDialogOpen(true);
  };

  return (
    <div
      style={{ width: 1000, display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <MaterialTable
          onRowClick={(event, rowData) => {
            handleOnClientsTableRowClick(rowData);
          }}
          title="Clients"
          columns={columns}
          data={clients}
        />
      </div>
      <div>
        <DeliveryNoteCreatingForm
          open={deliveryDialogOpen}
          onCloseClick={() => setDeliveryDialogOpen(false)}
          onRegisterClick={handleRegisterDeliveryNoteClick}
          deliveryNote={currentDeliveryNote}
          drivers={drivers}
        />
      </div>
      <ItemList
        onRowClick={(item) => {
          setCurrentDeliveryNote(item.deliveryNote);
          setDeliveryDialogOpen(true);
        }}
        listName="Rejected delivery notes"
        items={rejectedDeliveryNotes.map((deliveryNote) => {
          return {
            deliveryNote,
            name: deliveryNote.index + " --- " + deliveryNote.registrationDate,
          };
        })}
      />
    </div>
  );
}
