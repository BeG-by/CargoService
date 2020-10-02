import {connect} from "react-redux";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {List} from "material-ui";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TableContainer from "@material-ui/core/TableContainer";
import {Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import fetchFieldFromObject from "../../parts/util/fetch-field-from-object";
import TablePagination from "@material-ui/core/TablePagination";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import StoreIcon from '@material-ui/icons/Store';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import Divider from "@material-ui/core/Divider";

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

const columns = [
    {label: "Name", id: "name", minWidth: 100},
    {label: "Mass", id: "mass", minWidth: 50},
    {label: "Measure", id: "massMeasure", minWidth: 100},
    {label: "Price", id: "price", minWidth: 50},
    {label: "Currency", id: "currency", minWidth: 50},
    {label: "Quantity", id: "quantity", minWidth: 50},
    {label: "Measure", id: "quantityMeasure", minWidth: 100},
    {label: "Lost quantity", id: "lostQuantity", minWidth: 100},
    {label: "Comment", id: "comment", minWidth: 100},
];

export const ActInfo = connect(mapStateToProps)((props) => {
    const invoice = props.invoice;
    const act = props.act;

    const losses = [];
    invoice.products.forEach(p => {
        if (p.lostQuantity > 0) {
            losses.push(p);
        }
    })

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Paper>
                <List style={{alignItems: "flex-start"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                            <ListItemIcon>
                                <HowToRegIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        {invoice.driver.name + " " +
                                        invoice.driver.surname}
                                    </React.Fragment>
                                }
                                secondary="Driver"
                            />
                            <ListItemIcon>
                                <HowToRegIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        {act.consigneeWorker}
                                    </React.Fragment>
                                }
                                secondary="Consignee worker"
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
                                        {invoice.shipper}
                                    </React.Fragment>
                                }
                                secondary="Shipper"
                            />
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
                        <Divider orientation="vertical" flexItem/>
                        <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                            <ListItemIcon>
                                <DepartureBoardIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        {act.registrationDate}
                                    </React.Fragment>
                                }
                                secondary="Registration date"
                            />
                        </ListItem>
                    </div>
                </List>
                <Divider/>
                <TableContainer>
                    <Typography variant="h6"
                                gutterBottom
                                style={{textAlign: "center", marginTop: 15, marginLeft: 15}}>
                        Lost products list:
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
                            {losses
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
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={losses.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

            </Paper>
        </div>
    );
})