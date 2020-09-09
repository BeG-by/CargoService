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

//todo: fix back and return this version
// let countPriceForAllProducts = (amountProducts, priceForOne) => {
//   const accuracy = 3;
//   if (
//     validateAmountProducts(amountProducts).isValid &&
//     validatePriceForOneProduct(priceForOne).isValid
//   )
//     return (amountProducts * priceForOne).toFixed(accuracy);
//   else {
//     return 0;
//   }
// };

let countSum = (amountProducts, priceForOne) => {
  if (
    validateAmountProducts(amountProducts).isValid &&
    validatePriceForOneProduct(priceForOne).isValid
  )
    return amountProducts * priceForOne;
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
    title: "Measure",
    field: "measure",
  },
  {
    title: "Mass",
    field: "mass",
  },
  {
    title: "Quantity",
    field: "quantity",
    type: "numeric",
    validate: (rowData) => validateAmountProducts(rowData.quantity),
  },
  {
    title: "Price",
    field: "price",
    type: "numeric",
    validate: (rowData) => validatePriceForOneProduct(rowData.price),
  },
  {
    title: "Sum",
    field: "sum",
    type: "numeric",
    editable: "never",
  },
];

export default function ProductsTable(props) {
  const editable = props.editable;
  const onRowAdd = props.onRowAdd;
  const onRowUpdate = props.onRowUpdate;
  const onRowDelete = props.onRowDelete;
  const products = props.products;

  return (
    <MaterialTable
      title="Products table"
      columns={columns}
      data={products}
      onRowClick={(event, item) => {
        props.onRowClick(item);
      }}
      editable={
        editable
          ? {
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    newData.sum = countSum(newData.quantity, newData.price);
                    onRowAdd(newData);
                    resolve();
                  }, 600);
                }),

              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    if (oldData) {
                      newData.sum = countSum(newData.quantity, newData.price);
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
            }
          : null
      }
    />
  );
}
