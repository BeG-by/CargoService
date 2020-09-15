import React, { useEffect, useState } from "react";
import FormikField from "../../common/formik-field";
import { Formik, Form } from "formik";
import ProductOwnerTypeSelector from "../product-owner-type-selector";
import ItemList from "../../common/item-list";
import ProductsTable from "../products/products-table";
import ProductDialog from "../products/product-dialog";
import { Button } from "@material-ui/core";

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
  const [productOwner, setProductOwner] = useState(props.productOwner);
  const [selectedDriver, setSelectedDriver] = useState(EMPTY_DRIVER);
  const [selectedProduct, setSelectedProduct] = useState(EMPTY_PRODUCT);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [products, setProducts] = useState([
    {
      name: "Banana",
      measure: "MyMeasure",
      mass: "MyMass",
      quantity: 12,
      price: "321",
    },
  ]);
  const [drivers, setDrivers] = useState([
    { name: "Vladik", surname: "Some surname", passport: "MP321321" },
    { name: "FUF", surname: "Somedsa surname", passport: "MP3sda21321" },
  ]);

  useEffect(() => {
    setProductOwner(props.productOwner);
  }, [props.productOwner]);

  //todo: rename it, because we click close (not close on submit)
  const handleProductDialogClose = () => {
    setSelectedProduct(EMPTY_PRODUCT);
    setProductDialogOpen(false);
  };

  const handleProductDialogSubmit = (product) => {
    if (product.id === -1) {
      product.id = productIndex;
      setProductIndex(product.id + 1);
      setProducts((prevState) => {
        const temp = [...prevState];
        temp.push(product);
        return temp;
      });
    } else {
      setProducts((prevState) => {
        const temp = [...prevState];
        for (let el of temp) {
          if (el.id === product.id) {
            el.name = product.name;
            el.measure = product.measure;
            el.mass = product.mass;
            el.quantity = product.quantity;
            el.price = product.price;
          }
        }
        return temp;
      });
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

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={{
          // name: client.name,
          // payerAccountNumber: client.payerAccountNumber,
          // companyType: client.type,
          // email: client.email,
          // country: client.address.country,
          // city: client.address.city,
          productOwnerName: productOwner.name,
          productOwnerPhone: productOwner.phone,
          productOwnerType: productOwner.type,

          driverName: selectedDriver.name,
          driverSurname: selectedDriver.surname,
          driverPassport: selectedDriver.passport,
          // street: client.address.street,
          // house: client.address.house,
          // flat: client.address.flat,
          // registrationDate: client.registrationDate,
        }}
        // onSubmit={handleSubmit}
      >
        {(formProps) => (
          <Form>
            {/* <FormikField
            formikProps={formProps}
            id={"registrationUserName"}
            label={"Registration user name"}
            formikFieldName={"registrationUserName"}
          />
          <FormikField
            formikProps={formProps}
            id={"registrationUserSurname"}
            label={"Registration user surname"}
            formikFieldName={"registrationUserSurname"}
          />
          <FormikField
            formikProps={formProps}
            id={"registrationUserPatronymic"}
            label={"Registration user patronymic"}
            formikFieldName={"registrationUserPatronymic"}
          /> */}

            {/* <FormikField
            formikProps={formProps}
            id={"carrierCompanyName"}
            label={"Carrier company name"}
            formikFieldName={"carrierCompanyName"}
          />
          <FormikField
            formikProps={formProps}
            id={"carrierCompanyPAN"}
            label={"Carrier company PAN"}
            formikFieldName={"carrierCompanyPAN"}
          />
 */}
            <FormikField
              disabled={true}
              formikProps={formProps}
              id={"productOwnerName"}
              label={"Product owner name"}
              formikFieldName={"productOwnerName"}
            />
            <ProductOwnerTypeSelector
              disabled={true}
              formikProps={formProps}
              id="productOwnerType"
              formikFieldName="productOwnerType"
              label="Product owner type"
            />
            <FormikField
              disabled={true}
              formikProps={formProps}
              id={"productOwnerPhone"}
              label={"Product owner phone"}
              formikFieldName={"productOwnerPhone"}
            />

            <FormikField
              formikProps={formProps}
              id={"invoiceNumber"}
              label={"Invoice number"}
              formikFieldName={"invoiceNumber"}
            />

            <FormikField
              disabled={true}
              formikProps={formProps}
              id={"invoiceRegistrationDate"}
              label={"Invoice registration date"}
              formikFieldName={"invoiceRegistrationDate"}
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

            <FormikField
              disabled={true}
              formikProps={formProps}
              id={"driverName"}
              label={"Driver name"}
              formikFieldName={"driverName"}
            />
            <FormikField
              disabled={true}
              formikProps={formProps}
              id={"driverSurname"}
              label={"Driver surname"}
              formikFieldName={"driverSurname"}
            />
            <FormikField
              disabled={true}
              formikProps={formProps}
              id={"driverPassport"}
              label={"Driver passport"}
              formikFieldName={"driverPassport"}
            />
            <ItemList
              items={drivers}
              onRowClick={(item) => {
                setSelectedDriver(item);
              }}
            />
          </Form>
        )}
      </Formik>

      <ProductsTable products={products} onRowClick={handleTableRowClick} />
      <ProductDialog
        open={productDialogOpen}
        initProductState={selectedProduct}
        onSubmit={handleProductDialogSubmit}
        onClose={handleProductDialogClose}
      />
      <Button onClick={handleCreateNewProductClick}>Create new</Button>
    </React.Fragment>
  );
};
