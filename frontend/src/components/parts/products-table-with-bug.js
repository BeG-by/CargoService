import React from "react";
import MaterialTable from "material-table";

let validateName = (name) => {
  if (name === "" || name === undefined) {
    return { isValid: false, helperText: "" };
  } else {
    return { isValid: true, helperText: "" };
  }
};

let validateAmountProducts = (amount) => {
  if (amount === "" || amount === undefined || Number.isNaN(amount)) {
    return { isValid: false, helperText: "" };
  } else {
    return { isValid: true, helperText: "" };
  }
};

let validatePriceForOneProduct = (price) => {
  if (price === "" || price === undefined || Number.isNaN(price)) {
    return { isValid: false, helperText: "" };
  } else {
    return { isValid: true, helperText: "" };
  }
};

let countPriceForAllProducts = (amountProducts, priceForOne) => {
  const accuracy = 3;
  if (
    validateAmountProducts(amountProducts).isValid &&
    validatePriceForOneProduct(priceForOne).isValid
  )
    return (amountProducts * priceForOne).toFixed(accuracy);
  else {
    return 0;
  }
};

const columns = [
  {
    title: "Name",
    field: "name",
    validate: (rowData) => validateName(rowData.name),
  },
  {
    title: "Amount",
    field: "amount",
    type: "numeric",
    validate: (rowData) => validateAmountProducts(rowData.amount),
  },
  {
    title: "Price for one",
    field: "priceForOne",
    type: "numeric",
    validate: (rowData) => validatePriceForOneProduct(rowData.priceForOne),
  },
  {
    title: "Price for all",
    field: "priceForAll",
    type: "numeric",
    editable: "never",
  },
];

export default function ProductsTable(props) {
  const onRowAdd = props.onRowAdd;
  const onRowUpdate = props.onRowUpdate;
  const onRowDelete = props.onRowDelete;
  const products = props.products;

  return (
    <MaterialTable
      title="Products table"
      columns={columns}
      data={products}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              newData.priceForAll = countPriceForAllProducts(
                newData.amount,
                newData.priceForOne
              );
              onRowAdd(newData);
              resolve();
            }, 600);
          }),

        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              if (oldData) {
                newData.priceForAll = countPriceForAllProducts(
                  newData.amount,
                  newData.priceForOne
                );
                onRowUpdate(newData, oldData);
              }
              resolve();
            }, 600);
          }),

        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              onRowDelete(oldData);
              resolve();
            }, 600);
          }),
      }}
    />
  );
}
