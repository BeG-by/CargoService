import React, {useState} from "react";
import {Dialog} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ItemList from "../../parts/item-list";
import ProductsTable from "../../parts/products-table";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100ch',
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function convertToNecessaryApi(productsFromTable) {
    let products = [];
    for (let product of productsFromTable) {
        products.push({
            name: product.name,
            amount: product.amount,
            priceForOne: product.priceForOne,
            priceForAll: product.priceForAll
        })
    }
    return products;
}

export default function DeliveryNoteForm(props) {
    const classes = useStyles();

    const open = props.open;
    const onCloseClick = props.onCloseClick;
    const onRegisterClick = props.onRegisterClick;

    const name = props.name;
    const lastName = props.lastName;
    const patronymic = props.patronymic;
    const clientCompany = props.clientCompany;
    const drivers = props.drivers;

    const [deliveryNoteIndex, setDeliveryNoteIndex] = useState("");
    const [driver, setDriver] = useState({id: "", name: "", lastName: ""})
    const [products, setProducts] = useState([]);

    const handleRegisterDeliveryNote = () => {
        let deliveryNote = {};
        deliveryNote.dispatcher = {
            name: name,
            lastName: lastName,
            patronymic: patronymic,
        };
        deliveryNote.driver = driver;

        deliveryNote.products = convertToNecessaryApi(products);
        deliveryNote.clientCompany = clientCompany;
        deliveryNote.deliveryNoteIndex = deliveryNoteIndex;

        onRegisterClick(deliveryNote)
        onCloseClick();
    }

    const handleProductAdding = (product) => {
        setProducts((prevState) => {
            const products = [...prevState];
            products.push(product);
            return products
        });
    }

    const handleProductDeleting = (product) => {
        setProducts((prevState) => {
            const products = [...prevState];
            products.splice(products.indexOf(product), 1);
            return products;
        });
    }

    const handleProductUpdating = (newProduct, oldProduct) => {
        setProducts((prevState) => {
            const products = [...prevState];
            products[products.indexOf(oldProduct)] = newProduct;
            return products;
        });
    }

    return (
        <div>
            <Dialog fullScreen open={open} onClose={onCloseClick} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onCloseClick} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Delivery note registration
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleRegisterDeliveryNote}>
                            Register
                        </Button>
                    </Toolbar>
                </AppBar>


                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField label="Name"
                                   id="name"
                                   defaultValue={name}
                                   disabled={true}/>
                        <TextField label="Last name"
                                   id="last_name"
                                   defaultValue={lastName}
                                   disabled={true}/>
                        <TextField label="Patronymic"
                                   id="patronymic"
                                   defaultValue={patronymic}
                                   disabled={true}/>
                        <TextField label="Client company"
                                   id="client_company"
                                   defaultValue={clientCompany.name}
                                   disabled={true}/>
                        <TextField label="Registration date"
                                   id="registration_date"
                                   defaultValue={new Date().toISOString().slice(0, 10)} disabled={true}/>
                    </div>

                    <TextField label="Delivery note index"
                               id="delivery_note_index"
                               onChange={(e) => setDeliveryNoteIndex(e.target.value)}/>

                    <div>
                        <TextField label="Driver"
                                   value={driver.name}
                                   id="selected_driver"
                                   disabled={true}/>
                        <ItemList items={drivers}
                                  onRowClick={(item) => (setDriver(item))}/>
                    </div>
                    <div>
                        <ProductsTable
                            onRowAdd={(product) => {
                                handleProductAdding(product)
                            }}
                            onRowDelete={(product) => {
                                handleProductDeleting(product)
                            }}
                            onRowUpdate={(newProduct, oldProduct) => {
                                handleProductUpdating(newProduct, oldProduct)
                            }}
                            products={products}/>
                    </div>
                </form>
            </Dialog>
        </div>
    );
}