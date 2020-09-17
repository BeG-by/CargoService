import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import InvoiceCreatingForm from "../../forms/invoice-form/invoice-creating-form";
import ItemList from "../../parts/lists/item-list";
// import {
//   getDrivers,
//   getProductOwners,
//   getRejectedInvoices,
// } from "../../../request-api/utils";

const columns = [
  { title: "Name", field: "name" },
  { title: "Address", field: "address" },
  { title: "Phone", field: "phone" },
  { title: "Contact", field: "contact" },
];

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

const EMPTY_INVOICE = {
  clientCompany: {},
  registrationUser: {
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

export default function MainBodyDispatcher() {
  const [clients, setClients] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [rejectedInvoices, setRejectedInvoices] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     setClients(await getProductOwners());
  //     setDrivers(await getDrivers());
  //     setRejectedInvoices(await getRejectedInvoices());
  //   }
  //   fetchData();
  // }, []);

  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(EMPTY_INVOICE);

  const handleRegisterInvoiceClick = (invoice) => {
    setInvoiceDialogOpen(false);
    alert("Registered");
  };

  const handleOnClientsTableRowClick = (clientData) => {
    setSelectedInvoice({
      clientCompany: clientData,
      registrationUser: {
        name: user.name,
        lastName: user.lastName,
        patronymic: user.patronymic,
      },
      number: "",
      departurePlace: "",
      deliveryPlace: "",
      carrierCompany: user.company,
      driver: { id: -1, name: "", surname: "", passport: "" },
      products: [],
    });
    setInvoiceDialogOpen(true);
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
        <InvoiceCreatingForm
          open={invoiceDialogOpen}
          onCloseClick={() => setInvoiceDialogOpen(false)}
          onRegisterClick={handleRegisterInvoiceClick}
          invoice={selectedInvoice}
          drivers={drivers}
        />
      </div>
      <ItemList
        onRowClick={(item) => {
          setSelectedInvoice(item.invoice);
          setInvoiceDialogOpen(true);
        }}
        listName="Rejected delivery notes"
        items={rejectedInvoices.map((invoice) => {
          return {
            invoice,
            name: invoice.index + " --- " + invoice.registrationDate,
          };
        })}
      />
    </div>
  );
}
