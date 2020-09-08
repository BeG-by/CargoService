import React, { useState, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import ItemList from "../../parts/lists/item-list";
import ProductsTable from "../../parts/crud-products-table";
import useStyles from "./styles";
import { saveInvoice } from "../../../request-api/utils";
import { convertInvoiceToNecessaryApi, Transition } from "./utils";

const initDriverState = {
  name: "",
  surname: "",
  passport: "",
};

export default function InvoiceForm(props) {
  const classes = useStyles();

  const [invoiceNumber, setInvoiceNumber] = useState(props.invoice.number);
  const [departurePlace, setDeparturePlace] = useState(
    props.invoice.departurePlace
  );
  const [deliveryPlace, setDeliveryPlace] = useState(
    props.invoice.deliveryPlace
  );
  const [products, setProducts] = useState(props.invoice.products);
  const [driver, setDriver] = useState(initDriverState);

  useEffect(() => {
    setInvoiceNumber(props.invoice.number);
  }, [props.invoice.number]);

  useEffect(() => {
    setDeparturePlace(props.invoice.departurePlace);
  }, [props.invoice.departurePlace]);

  useEffect(() => {
    setDeliveryPlace(props.invoice.deliveryPlace);
  }, [props.invoice.deliveryPlace]);

  useEffect(() => {
    setProducts(props.invoice.products);
  }, [props.invoice.products]);

  useEffect(() => {
    setDriver({
      id: props.invoice.driver.id,
      name: props.invoice.driver.name,
      surname: props.invoice.driver.surname,
      passport: props.invoice.driver.passport,
    });
  }, [
    props.invoice.driver.id,
    props.invoice.driver.name,
    props.invoice.driver.surname,
    props.invoice.driver.passport,
  ]);

  const handleRegisterInvoiceClick = () => {
    let invoice = {};

    invoice.number = props.invoice.number;
    invoice.registrationUser = props.invoice.registrationUser;
    invoice.clientCompany = props.invoice.clientCompany;
    invoice.carrierCompany = props.invoice.carrierCompany;

    //replace on invoice.getRegistrationDae
    invoice.registrationDate = new Date().toISOString().slice(0, 10);
    invoice.driver = driver;
    invoice.products = products;
    invoice.number = invoiceNumber;
    invoice.departurePlace = departurePlace;
    invoice.deliveryPlace = deliveryPlace;

    let necessaryInvoice = convertInvoiceToNecessaryApi(invoice);

    console.log("SEND INVOICE");
    console.log(necessaryInvoice);

    saveInvoice(necessaryInvoice);
    props.onRegisterClick(invoice);
  };

  const handleProductAdding = (product) => {
    setProducts((prevState) => {
      const products = [...prevState];
      products.push(product);
      return products;
    });
  };

  const handleProductDeleting = (product) => {
    setProducts((prevState) => {
      const products = [...prevState];
      products.splice(products.indexOf(product), 1);
      return products;
    });
  };

  const handleProductUpdating = (newProduct, oldProduct) => {
    setProducts((prevState) => {
      const products = [...prevState];
      products[products.indexOf(oldProduct)] = newProduct;
      return products;
    });
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.onCloseClick}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.onCloseClick}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Invoice note registration
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleRegisterInvoiceClick}
            >
              Register
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.root} noValidate autoComplete="off">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              <div>
                <h3>Registered by</h3>
                <TextField
                  label="Name"
                  id="name"
                  defaultValue={props.invoice.registrationUser.name}
                  disabled={true}
                />
                <TextField
                  label="Last name"
                  id="last_name"
                  defaultValue={props.invoice.registrationUser.lastName}
                  disabled={true}
                />
                <TextField
                  label="Patronymic"
                  id="patronymic"
                  defaultValue={props.invoice.registrationUser.patronymic}
                  disabled={true}
                />
              </div>

              <div>
                <h3>Client company</h3>
                <TextField
                  label="Client company"
                  id="client_company_name"
                  defaultValue={props.invoice.clientCompany.name}
                  disabled={true}
                />
                <TextField
                  label="PAN"
                  id="client_company_pan"
                  defaultValue={props.invoice.clientCompany.pan}
                  disabled={true}
                />
              </div>

              <div>
                <h3>Carrier company</h3>
                <TextField
                  label="Carrier company"
                  id="carrier_company_name"
                  defaultValue={props.invoice.carrierCompany.name}
                  disabled={true}
                />
                <TextField
                  label="PAN"
                  id="carrier_company_pna"
                  defaultValue={props.invoice.carrierCompany.pan}
                  disabled={true}
                />
              </div>
              <div>
                <TextField
                  label="Invoice note number"
                  id="invoice_note_number"
                  defaultValue={props.invoice.number}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
                <h3>Addresses</h3>
                <TextField
                  label="Departure place"
                  id="departure_place"
                  defaultValue={props.invoice.departurePlace}
                  onChange={(e) => setDeparturePlace(e.target.value)}
                />
                <TextField
                  label="Delivery place"
                  id="delivery_place"
                  defaultValue={props.invoice.deliveryPlace}
                  onChange={(e) => setDeliveryPlace(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <h3>Registration date</h3>
                <TextField
                  label="Registration date"
                  id="registration_date"
                  //todo: fix default value
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <h3>Driver</h3>
              <TextField
                label="Name"
                value={driver.name}
                id="selected_driver_name"
                disabled={true}
              />
              <TextField
                label="Last name"
                value={driver.surname}
                id="selected_driver_surname"
                disabled={true}
              />
              <TextField
                label="Passport"
                value={driver.passport}
                id="selected_driver_passport"
                disabled={true}
              />
              <ItemList
                items={props.drivers}
                onRowClick={(item) => {
                  setDriver(item);
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProductsTable
              editable={true}
              onRowAdd={(product) => {
                handleProductAdding(product);
              }}
              onRowDelete={(product) => {
                handleProductDeleting(product);
              }}
              onRowUpdate={(newProduct, oldProduct) => {
                handleProductUpdating(newProduct, oldProduct);
              }}
              products={products}
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
}
