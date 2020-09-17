import React, { useEffect, useState } from "react";
import FormikField from "../../common/formik-field";
import { Formik, Form } from "formik";
import ItemList from "../../common/item-list";
import ProductsTable from "../products/products-table";
import ProductDialog from "../products/product-dialog";
import { InvoiceFormValidation } from "./validation";
import { Button } from "@material-ui/core";
import {
  makeGetAllDriversRequest,
  makeSaveInvoiceRequest,
} from "../request-utils";
import TextField from "@material-ui/core/TextField";

const EMPTY_DRIVER = {
  name: "",
  surname: "",
  passport: "",
};

const EMPTY_PRODUCT = {
  id: -1,
  name: "",
  measure: "",
  mass: "",
  quantity: "",
  price: "",
};

export default (props) => {
  const [drivers, setDrivers] = useState([]);

  const updateDriversList = async () => {
    try {
      const res = await makeGetAllDriversRequest();
      setDrivers(res.data);
    } catch (error) {
      setDrivers([]);
      handleRequestError(error);
    }
  };

  const makeGetInvoiceByIdRequest = (id) => {
    //todo
  };

  useEffect(() => {
    updateDriversList();
    let invoice = makeGetInvoiceByIdRequest(props.invoiceID);

    //updateProducts
    //updateRegistrationDate
    //updateProductOwner
    //updateSelectedDriver
  }, [props.invoiceID]);

  const [selectedDriver, setSelectedDriver] = useState(EMPTY_DRIVER);
  const [selectedProduct, setSelectedProduct] = useState(EMPTY_PRODUCT);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);

  const [products, setProducts] = useState([]);

  const handleProductDialogClose = () => {
    setSelectedProduct(EMPTY_PRODUCT);
    setProductDialogOpen(false);
  };

  const handleProductDelete = (id) => {
    if (id !== -1) {
      deleteProductById(id);
      handleProductDialogClose();
    }
  };

  const handleProductDialogSubmit = (product) => {
    if (product.id === -1) {
      addProduct(product);
    } else {
      updateProduct(product);
    }
    setSelectedProduct(EMPTY_PRODUCT);
    setProductDialogOpen(false);
  };

  const handleCreateNewProductClick = () => {
    setSelectedProduct(EMPTY_PRODUCT);
    setProductDialogOpen(true);
  };

  const handleTableRowClick = (product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  const addProduct = (product) => {
    product.id = productIndex;
    setProductIndex(product.id + 1);
    setProducts((prevState) => {
      const temp = [...prevState];
      temp.push(product);
      return temp;
    });
  };

  const updateProduct = (newProduct) => {
    setProducts((prevState) => {
      const temp = [...prevState];
      for (let el of temp) {
        if (el.id === newProduct.id) {
          el.name = newProduct.name;
          el.measure = newProduct.measure;
          el.mass = newProduct.mass;
          el.quantity = newProduct.quantity;
          el.price = newProduct.price;
        }
      }
      return temp;
    });
  };

  const deleteProductById = (id) => {
    setProducts((prevState) => {
      const temp = [...prevState];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === id) {
          temp.splice(i, 1);
        }
      }
      return temp;
    });
  };

  const handleRequestError = (error) => {
    console.log(error.response);
    if (error.response && error.response.status !== 500) {
      alert(error.response.data);
      // openToast(error.response.data, "error");
    } else {
      alert("Cannot get response from server");
      // openToast("Cannot get response from server", "error");
    }
  };

  const handleSubmit = (values) => {
    const invoice = {};
    invoice.products = products;
    invoice.driverId = selectedDriver.id;
    invoice.invoiceNumber = values.invoiceNumber;
    invoice.shipper = values.shipper;
    invoice.consignee = values.consignee;
    invoice.status = "REGISTERED";
    invoice.registrationDate = new Date().toISOString().slice(0, 10);

    const saveInvoice = async (invoice) => {
      try {
        await makeSaveInvoiceRequest(invoice);
        alert("Saved");
        props.onClose();
      } catch (error) {
        handleRequestError(error);
      }
    };
    saveInvoice(invoice);
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={{
          invoiceNumber: invoice.invoiceNumber,
          shipper: invoice.shipper,
          consignee: invoice.consignee,
        }}
        onSubmit={handleSubmit}
        validationSchema={InvoiceFormValidation}
      >
        {(formProps) => (
          <Form>
            <TextField
              disabled={true}
              id={"productOwnerName"}
              label={"Product owner name"}
              value={props.productOwner.name}
            />
            <TextField
              disabled={true}
              id="productOwnerType"
              label="Product owner type"
              value={props.productOwner.type}
            />
            <TextField
              disabled={true}
              id={"productOwnerPhone"}
              label={"Product owner phone"}
              value={props.productOwner.phone}
            />

            <TextField
              disabled={true}
              id={"invoiceRegistrationDate"}
              label={"Invoice registration date"}
              value={new Date().toISOString().slice(0, 10)}
            />

            <FormikField
              formikProps={formProps}
              id={"invoiceNumber"}
              label={"Invoice number"}
              formikFieldName={"invoiceNumber"}
            />

            <FormikField
              formikProps={formProps}
              id={"shipper"}
              label={"Shipper"}
              formikFieldName={"shipper"}
            />

            <FormikField
              formikProps={formProps}
              id={"consignee"}
              label={"Consignee"}
              formikFieldName={"consignee"}
            />

            <TextField
              disabled={true}
              id={"driverName"}
              label={"Driver name"}
              value={selectedDriver.name}
            />
            <TextField
              disabled={true}
              id={"driverSurname"}
              label={"Driver surname"}
              value={selectedDriver.surname}
            />
            <TextField
              disabled={true}
              id={"driverPassport"}
              label={"Driver passport"}
              value={selectedDriver.passport}
            />
            <ItemList
              items={drivers}
              onRowClick={(item) => {
                setSelectedDriver(item);
              }}
            />
            <ProductsTable
              products={products}
              onRowClick={handleTableRowClick}
            />
            <ProductDialog
              open={productDialogOpen}
              initProductState={selectedProduct}
              onSubmit={handleProductDialogSubmit}
              onDelete={handleProductDelete}
              onClose={handleProductDialogClose}
            />
            <Button onClick={handleCreateNewProductClick}>Create new</Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={formProps.listener}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
