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

const columns = [
    {id: "name", label: "Name", minWidth: 200},
    {id: "quantity", label: "Quantity", minWidth: 100},
    {id: "measure", label: "Measure", minWidth: 100},
    {id: "price", label: "Price", minWidth: 100},
    {id: "sum", label: "Sum", minWidth: 100},
    {id: "mass", label: "Mass", minWidth: 100},
    {id: "status", label: "Status", minWidth: 100},
];

function fetchFieldFromObject(obj, prop) {
    let index = prop.indexOf(".");
    if (index > 0) {
        return fetchFieldFromObject(
            obj[prop.substring(0, index)],
            prop.substr(index + 1)
        );
    }
    return obj[prop];
}

export default function InvoiceInfoContent(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    return (
        <div>
            <Paper>
                <List style={{alignItems: "flex-start"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                    <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                        <ListItemIcon>
                            <CheckCircleIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Invoice #"
                            secondary={
                                <React.Fragment>
                                    {props.invoice.number}
                                </React.Fragment>
                            }
                        />
                        <ListItemIcon>
                            <CheckCircleIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Invoice status"
                            secondary={
                                <React.Fragment>
                                    {props.invoice.invoiceStatus}
                                </React.Fragment>
                            }
                        />
                        <ListItemIcon>
                            <CheckCircleIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Waybill #"
                            secondary={
                                <React.Fragment>
                                    {props.invoice.waybillId}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                        <ListItemIcon>
                            <DepartureBoardIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Registration Date"
                            secondary={
                                <React.Fragment>
                                    {props.invoice.registrationDate}
                                </React.Fragment>
                            }
                        />
                        <ListItemIcon>
                            <DepartureBoardIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Checking Date"
                            secondary={
                                <React.Fragment>
                                    {props.invoice.checkingDate}
                                </React.Fragment>
                            }
                        />
                        <ListItemIcon>
                            <DepartureBoardIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Closing Date"
                            secondary={
                                <React.Fragment>
                                    {props.invoice.closeDate}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <ListItem style={{flexDirection: "column", alignItems: "flex-start"}} >
                        <ListItemIcon>
                            <HowToRegIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Driver"
                            secondary={
                                <React.Fragment>
                                    {props.invoice.driver.name} {props.invoice.driver.surname}
                                </React.Fragment>
                            }
                        />
                        <ListItemIcon>
                            <HowToRegIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Registering User"
                            secondary={
                                <React.Fragment>
                                    {props.invoice.registrationUser.name} {props.invoice.registrationUser.surname}
                                </React.Fragment>
                            }
                        />
                        <ListItemIcon>
                            <HowToRegIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Checking User"
                            secondary={
                                <React.Fragment>
                                    {props.invoice.checkingUser === null ? null : props.invoice.checkingUser.name}
                                    {props.invoice.checkingUser === null ? null : props.invoice.checkingUser.surname}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    </div>
                </List>
                <TableContainer>
                    <Typography variant="h6"
                                gutterBottom
                                style={{textAlign: "center", marginTop: 15, marginLeft: 15}}>
                        Products List:
                    </Typography>
                    <Table
                        aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{minWidth: column.minWidth, fontSize: 16, color: "#3f51b5"}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.invoice.products
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
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={props.invoice.products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {props.buttons}
                </div>
            </Paper>
        </div>
    );
}