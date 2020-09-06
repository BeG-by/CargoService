import React, { useState } from "react";
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
      name: "BestCargo",
      pan: "S32YY3213",
    },

    //todo: fix this shit
    jwtToken: localStorage.getItem("authorization"),
  };

  const rejectedDeliveryNotes = getRejectedDeliveryNotesByDispatcherId(user.id);
  const drivers = getDriversByCompanyId(user.companyId);
  const clients = getClientsByCompanyId(user.companyId);

  const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false);
  const [currentDeliveryNote, setCurrentDeliveryNote] = useState({
    //todo: set via special methods
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
  });

  const handleRegisterDeliveryNoteClick = (deliveryNote) => {
    //todo: remove from arr clients field table data
    setDeliveryDialogOpen(false);
    alert("Registered");
  };

  return (
    <div
      style={{ width: 1000, display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <MaterialTable
          onRowClick={(event, rowData) => {
            setCurrentDeliveryNote({
              clientCompany: rowData,
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
