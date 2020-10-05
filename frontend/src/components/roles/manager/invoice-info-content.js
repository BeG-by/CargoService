import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import React from "react";
import {Typography} from "@material-ui/core";
import {List} from "material-ui";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import StoreIcon from '@material-ui/icons/Store';
import CommentIcon from '@material-ui/icons/Comment';
import {ActInfo} from "./act-info";
import {DialogWindow} from "../../parts/dialogs/dialog";
import fetchFieldFromObject from "../../parts/util/function-util";
import Tooltip from '@material-ui/core/Tooltip';
import {WaybillInfo} from "../driver/waybill-info";
import Divider from "@material-ui/core/Divider";
import {UserInfo} from "../admin/user-info";

const columns = [
    {label: "Name", id: "name", minWidth: 150, maxWidth: 150},
    {label: "Mass", id: "mass", minWidth: 50, maxWidth: 50},
    {label: "Measure", id: "massMeasure", minWidth: 100, maxWidth: 100},
    {label: "Price", id: "price", minWidth: 50, maxWidth: 50},
    {label: "Currency", id: "currency", minWidth: 50, maxWidth: 50},
    {label: "Quantity", id: "quantity", minWidth: 50, maxWidth: 50},
    {label: "Measure", id: "quantityMeasure", minWidth: 100, maxWidth: 100},
];

let CURRENCY;

function priceProduct(price, quantity, currency) {
    CURRENCY = currency;
    return price * quantity;
}

function weightProduct(measure, mass) {
    return measure === "KG"
        ? +mass
        : +mass * 1000;
}

function countTotalSum(products) {
    return products.map((p) => priceProduct(p.price, p.quantity, p.currency)).reduce((sum, p) => sum + p, 0);
}

function countTotalWeight(products) {
    return products.map((p) => weightProduct(p.massMeasure, p.mass)).reduce((sum, p) => sum + p, 0);
}

export default function InvoiceInfoContent(props) {
    const invoice = props.invoice;
    const act = props.invoice.act;
    const waybill = props.invoice.waybill;
    const totalSum = countTotalSum(invoice.products);
    const totalWeight = countTotalWeight(invoice.products);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
    const [actInfoDialogOpen, setActInfoDialogOpen] = React.useState(false);
    const [waybillInfoDialogOpen, setWaybillInfoDialogOpen] = React.useState(false);
    const [userInfoDialogOpen, setUserInfoDialogOpen] = React.useState(false);
    const [form, setForm] = React.useState(null);
    const [title, setTitle] = React.useState("");

    const handleActInfoOpen = () => {
        setForm(<ActInfo act={act} invoice={invoice}/>);
        setActInfoDialogOpen(true);
    }

    const handleWaybillInfoOpen = () => {
        setForm(<WaybillInfo waybillId={waybill.id}/>);
        setWaybillInfoDialogOpen(true);
    }

    const handleDriverInfoOpen = () => {
        const id = invoice.driver.id;
        setForm(<UserInfo userId={id}/>);
        setTitle("Driver");
        setUserInfoDialogOpen(true);
    }

    const handleDispatcherInfoOpen = () => {
        const id = invoice.registrationUser.id;
        setForm(<UserInfo userId={id}/>);
        setTitle("Dispatcher");
        setUserInfoDialogOpen(true);
    }

    const handleManagerInfoOpen = () => {
        const id = invoice.checkingUser.id;
        if (id !== null && id !== "undefined") {
            setForm(<UserInfo userId={id}/>);
            setTitle("Manager");
            setUserInfoDialogOpen(true);
        }
    }

    const handleClose = () => {
        setActInfoDialogOpen(false);
        setWaybillInfoDialogOpen(false);
        setUserInfoDialogOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <div style={{alignItems: "flex-start"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <Paper style={{flexDirection: "column", alignItems: "flex-start"}}>
                        <List style={{alignItems: "flex-start"}}>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                                    <ListItemIcon>
                                        <CheckCircleIcon/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                {invoice.status}
                                            </React.Fragment>
                                        }
                                        secondary="Invoice status"
                                    />
                                    <ListItemIcon>
                                        <CheckCircleIcon/>
                                    </ListItemIcon>
                                    <Tooltip title="Click to see Waybill info" arrow>
                                        <ListItemText
                                            onClick={handleWaybillInfoOpen}
                                            primary={
                                                <React.Fragment>
                                                    {invoice.waybill !== null ?
                                                        <strong style={{color: "#3f51b5"}}>Filled</strong>
                                                        : "Empty"}
                                                </React.Fragment>
                                            }
                                            secondary="Waybill"
                                        />
                                    </Tooltip>
                                    <ListItemIcon>
                                        <CheckCircleIcon/>
                                    </ListItemIcon>
                                    <Tooltip title="Click to see Act info" arrow>
                                        <ListItemText
                                            onClick={handleActInfoOpen}
                                            primary={
                                                <React.Fragment>
                                                    {act !== null ?
                                                        <strong style={{color: "#3f51b5"}}>Filled</strong>
                                                        : "Empty"}
                                                </React.Fragment>
                                            }
                                            secondary="Act"
                                        />
                                    </Tooltip>
                                </ListItem>
                                <Divider orientation="vertical" flexItem/>
                                <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                                    <ListItemIcon>
                                        <DepartureBoardIcon/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                {invoice.registrationDate}
                                            </React.Fragment>
                                        }
                                        secondary="Registration Date"
                                    />
                                    <ListItemIcon>
                                        <DepartureBoardIcon/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                {invoice.checkingDate}
                                            </React.Fragment>
                                        }
                                        secondary="Checking Date"
                                    />
                                    <ListItemIcon>
                                        <DepartureBoardIcon/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                {invoice.closeDate}
                                            </React.Fragment>
                                        }
                                        secondary="Closing Date"
                                    />
                                </ListItem>
                                <Divider orientation="vertical" flexItem/>
                                <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                                    <ListItemIcon>
                                        <HowToRegIcon/>
                                    </ListItemIcon>
                                    <Tooltip title="Click to see Driver info" arrow>
                                        <ListItemText
                                            onClick={handleDriverInfoOpen}
                                            primary={
                                                <React.Fragment>
                                                    <strong style={{color: "#3f51b5"}}>
                                                        {invoice.driver.name + " "
                                                        + invoice.driver.surname}
                                                    </strong>
                                                </React.Fragment>
                                            }
                                            secondary="Driver"
                                        />
                                    </Tooltip>
                                    <ListItemIcon>
                                        <HowToRegIcon/>
                                    </ListItemIcon>
                                    <Tooltip title="Click to see Dispatcher info" arrow>
                                        <ListItemText
                                            onClick={handleDispatcherInfoOpen}
                                            primary={
                                                <React.Fragment>
                                                    <strong style={{color: "#3f51b5"}}>
                                                        {invoice.registrationUser.name + " "
                                                        + invoice.registrationUser.surname}
                                                    </strong>
                                                </React.Fragment>
                                            }
                                            secondary="Dispatcher"
                                        />
                                    </Tooltip>
                                    <ListItemIcon>
                                        <HowToRegIcon/>
                                    </ListItemIcon>
                                    <Tooltip title="Click to see Dispatcher info" arrow>
                                        <ListItemText
                                            onClick={handleManagerInfoOpen}
                                            primary={
                                                <React.Fragment>
                                                    {invoice.checkingUser === null
                                                        ? null
                                                        : <strong style={{color: "#3f51b5"}}>
                                                            {invoice.checkingUser.name + " "
                                                            + invoice.checkingUser.surname}
                                                        </strong>}
                                                </React.Fragment>
                                            }
                                            secondary="Manager"
                                        />
                                    </Tooltip>
                                </ListItem>
                            </div>
                            <Divider/>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                                    <ListItemIcon>
                                        <StoreIcon/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                {invoice.shipper}
                                            </React.Fragment>
                                        }
                                        secondary="Shipper"
                                    />
                                </ListItem>
                                <Divider orientation="vertical" flexItem/>
                                <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                                    <ListItemIcon>
                                        <StoreIcon/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                {invoice.consignee}
                                            </React.Fragment>
                                        }
                                        secondary="Consignee"
                                    />
                                </ListItem>
                            </div>
                            <Divider/>
                            <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                                <ListItemIcon>
                                    <CommentIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            {invoice.comment}
                                        </React.Fragment>
                                    }
                                    secondary="Comment"
                                />
                            </ListItem>
                        </List>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            {props.buttons}
                        </div>
                    </Paper>
                    <div style={{flexDirection: "column", minWidth: 50, alignItems: "flex-start"}}>
                    </div>
                    <Paper style={{flexDirection: "column", alignItems: "flex-start"}}>
                        <TableRow>
                            <TableCell style={{fontSize: 20}}>PRODUCTS</TableCell>
                            <TableCell colSpan={1}>Quantity:</TableCell>
                            <TableCell align="right"
                                       style={{fontWeight: "bold"}}>{invoice.products.length}</TableCell>
                            <TableCell colSpan={1}>Weight:</TableCell>
                            <TableCell align="right" style={{fontWeight: "bold"}}>{totalWeight + " KG"}</TableCell>
                            <TableCell colSpan={1}>Total Sum:</TableCell>
                            <TableCell align="right"
                                       style={{fontWeight: "bold"}}>{totalSum + " " + CURRENCY}</TableCell>
                        </TableRow>

                        <TableContainer style={{maxHeight: "80%"}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                style={{minWidth: column.minWidth, fontSize: 14, color: "#3f51b5"}}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invoice.products
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((product) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={product.id}
                                                >
                                                    {columns.map((column) => {
                                                        const value = fetchFieldFromObject(product, column.id);
                                                        return (
                                                            <TableCell key={column.id}>
                                                                {value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/>

                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            count={invoice.products.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                        />
                    </Paper>
                </div>
            </div>


            <DialogWindow
                dialogTitle={"Act to invoice # " + invoice.number}
                fullWidth={true}
                maxWidth="md"
                handleClose={handleClose}
                openDialog={actInfoDialogOpen}
                form={form}
            />

            <DialogWindow
                dialogTitle={"Waybill to invoice # " + invoice.number}
                fullWidth={true}
                maxWidth="md"
                handleClose={handleClose}
                openDialog={waybillInfoDialogOpen}
                form={form}
            />

            <DialogWindow
                dialogTitle={title}
                fullWidth={true}
                maxWidth="xs"
                handleClose={handleClose}
                openDialog={userInfoDialogOpen}
                form={form}
            />
        </div>
    );
}