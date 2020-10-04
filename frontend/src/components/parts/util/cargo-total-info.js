let cargoCurrency = ""; //fixme поменять когда внесут в инвойс

function priceProduct(price, quantity, currency) {
    cargoCurrency = currency;
    return price * quantity;
}

export const CURRENCY = cargoCurrency;

function weightProduct(measure, mass) {
    return measure === "KG"
        ? +mass
        : +mass * 1000;
}

export const countTotalSum = (products) => {
    return products.map((p) => priceProduct(p.price, p.quantity, p.currency)).reduce((sum, p) => sum + p, 0);
}

export const countTotalWeight = (products) => {
    return products.map((p) => weightProduct(p.massMeasure, p.mass)).reduce((sum, p) => sum + p, 0);
}

export const countTotalQuantity = (products) => {
    return products.map((p) => p.quantity).reduce((sum, p) => sum + p, 0);
}