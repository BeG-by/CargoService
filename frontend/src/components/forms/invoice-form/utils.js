import Slide from "@material-ui/core/Slide";
import React from "react";

export function convertToNecessaryApi(productsFromTable) {
  let products = [];
  for (let product of productsFromTable) {
    products.push({
      name: product.name,
      amount: product.amount,
      priceForOne: product.priceForOne,
      priceForAll: product.priceForAll,
    });
  }
  return products;
}

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
