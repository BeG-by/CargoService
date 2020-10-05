function priceProduct(price, quantity) {
    return price * quantity;
}

function weightProduct(measure, mass) {
    return measure === "KG"
        ? +mass
        : +mass * 1000;
}

export const countTotalSum = (products) => {
    return products.map((p) => priceProduct(p.price, p.quantity)).reduce((sum, p) => sum + p, 0);
}

export const countTotalLostSum = (products) => {
    return products.map((p) => priceProduct(p.price, p.lostQuantity)).reduce((sum, p) => sum + p, 0);
}

export const countTotalWeight = (products) => {
    return products.map((p) => weightProduct(p.massMeasure, p.mass)).reduce((sum, p) => sum + p, 0);
}

export const countTotalQuantity = (products) => {
    return products.map((p) => p.quantity).reduce((sum, p) => sum + p, 0);
}

export const countTotalLostQuantity = (products) => {
    return products.map((p) => p.lostQuantity).reduce((sum, p) => sum + p, 0);
}