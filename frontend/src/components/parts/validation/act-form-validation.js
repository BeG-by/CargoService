import * as Yup from "yup";

export const ActFormValidation = Yup.object({
    consigneeWorker: Yup.string()
        .required("Consignee worker is mandatory")
        .min(5, "Min length must be greater than 5 symbols")
        .max(255, "Max length must be lesser than 255 symbols"),
    productsCount: Yup.number()
        // .required("ffffffff") //TODO ????
        // .min(1, "Lost products are required")
});

export const ProductFormValidation = Yup.object({
    comment: Yup.string()
        .required("Comment is required")
        .max(500, "Max length must be lesser than 500 symbols"),
    lostQuantity: Yup.number()
        .required("Lost quantity is required")
        .min(0, "Quantity must be positive number"),
        // .lessThan(Yup.ref("quantity"), "Must be lesser than item total quantity"),
    productStatus: Yup.string()
        .required("Status is mandatory")
});
