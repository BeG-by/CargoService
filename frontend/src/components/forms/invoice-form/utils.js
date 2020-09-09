import Slide from "@material-ui/core/Slide";
import React from "react";

export function convertToNecessaryApi(productsFromTable) {
  let products = [];
  for (let product of productsFromTable) {
    products.push({
      name: product.name,
      quantity: product.quantity,
      measure: product.measure,
      price: product.price,
      sum: product.sum,
      mass: product.mass,
      status: "ACCEPTED",
    });
  }
  return products;
}

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function convertInvoiceToNecessaryApi(invoice) {
  let necessaryInvoice = {};

  necessaryInvoice.invoiceNumber = invoice.number;
  necessaryInvoice.registrationDate = invoice.registrationDate;
  necessaryInvoice.shipper = invoice.departurePlace;
  necessaryInvoice.consignee = invoice.deliveryPlace;
  necessaryInvoice.driverId = invoice.driver.id;
  necessaryInvoice.products = convertToNecessaryApi(invoice.products);

  return necessaryInvoice;
}
