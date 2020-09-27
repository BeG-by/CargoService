import * as Yup from "yup";

export const ProductFormValidationSchema = Yup.object({
    name: Yup.string().max(64, "Name is too long").required("Name is required"),
    quantity: Yup.number()
        .positive("Quantity must be positive integer")
        .integer("Quantity must be positive integer")
        .required("Quantity is required"),
    price: Yup.number()
        .positive("Price must be positive integer")
        .integer("Price must be positive integer")
        .required("Price is required"),
});