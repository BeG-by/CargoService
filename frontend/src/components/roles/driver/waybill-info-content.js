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
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import {getPointById, updatePoint} from "./request-utils";
import fetchFieldFromObject from "../../forms/fetch-field-from-object";
import CheckIcon from "@material-ui/icons/Check";
import StoreIcon from '@material-ui/icons/Store';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {DialogWindow} from "../../parts/dialogs/dialog";
import {PassPoint} from "../../parts/dialogs/pass-point";
import Divider from "@material-ui/core/Divider";
import {InvoiceInfo} from "../manager/invoice-info";
import {OkButton} from "../../parts/buttons/ok-button";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import {UserInfo} from "../admin/user-info";
import Tooltip from "@material-ui/core/Tooltip";

const columns = [
    {id: "place", label: "Place", minWidth: 200},
    {id: "passageDate", label: "Passage Date", minWidth: 200},
    {id: "passed", label: "Passed", minWidth: 200}
];

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const WaybillInfoContent = connect(mapStateToProps)((props) => {
    const role = props.role;
    const waybill = props.waybill;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [form, setForm] = React.useState(null);
    const [pointPassedDialogOpen, setPointPassedDialogOpen] = React.useState(false);
    const [invoiceInfoDialogOpen, setInvoiceInfoDialogOpen] = React.useState(false);
    const [userInfoDialogOpen, setUserInfoDialogOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");

    const handleTableRowClick = async (p) => {
        if (role === "DRIVER") {
            let selected = await getPointById(p.id);
            if (!selected.passed) {
                setTitle("Confirmation");
                setForm(<PassPoint handleClose={handleClose} action={props.action} selected={selected}/>);
                setPointPassedDialogOpen(true);
            }
        }
    };

    const handleClose = () => {
        setPointPassedDialogOpen(false);
        setInvoiceInfoDialogOpen(false);
        setUserInfoDialogOpen(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleInvoiceInfoOpen = () => {
        setForm(<InvoiceInfo invoiceId={waybill.invoice.id}/>);
        setTitle("Invoice # " + waybill.invoice.number);
        setInvoiceInfoDialogOpen(true);
    }

    const handleDriverInfoOpen = () => {
        const id = waybill.driver.id;
        setForm(<UserInfo userId={id}/>);
        setTitle("Driver");
        setUserInfoDialogOpen(true);
    }

    return (
        <div>
            <Button
                color="primary"
                variant="outlined"
                onClick={handleInvoiceInfoOpen}>
                {"See invoice info"}
            </Button>

            <Paper>
                <List style={{alignItems: "flex-start"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                            <ListItemIcon>
                                <LocalShippingIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        {waybill.auto.mark + " "
                                        + waybill.auto.type}
                                    </React.Fragment>
                                }
                                secondary="Auto"
                            />
                            <ListItemIcon>
                                <HowToRegIcon/>
                            </ListItemIcon>
                            <Tooltip title="Click to see Driver info" arrow>
                                <ListItemText
                                    onClick={handleDriverInfoOpen}
                                    primary={
                                        <React.Fragment>
                                            <strong style={{color: "#3f51b5"}}>
                                                {waybill.driver.name + " "
                                                + waybill.driver.surname}
                                            </strong>
                                        </React.Fragment>
                                    }
                                    secondary="Driver"
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
                                        {waybill.departureDate}
                                    </React.Fragment>
                                }
                                secondary="Departure Date"
                            />
                            <ListItemIcon>
                                <DepartureBoardIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        {waybill.arrivalDate}
                                    </React.Fragment>
                                }
                                secondary="Arrival Date"
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
                                        {waybill.shipper}
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
                                        {waybill.consignee}
                                    </React.Fragment>
                                }
                                secondary="Consignee"
                            />
                        </ListItem>
                    </div>
                </List>
                <Divider/>
                <TableContainer>
                    <Typography variant="h6"
                                gutterBottom
                                style={{textAlign: "center", marginTop: 15, marginLeft: 15}}>
                        Control Points:
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
                            {waybill.points
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((point) => {
                                    return (
                                        <TableRow
                                            onClick={() => {
                                                handleTableRowClick(point);
                                            }}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={point.id}
                                        >
                                            {columns.map((column) => {
                                                const value = fetchFieldFromObject(point, column.id);
                                                return (
                                                    <TableCell key={column.id}>
                                                        {column.id === 'passed' && value === true
                                                            ? <CheckIcon/>
                                                            : column.id === 'passed' && value === false
                                                                ? ""
                                                                : value}
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
                    count={waybill.points.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <DialogWindow
                    dialogTitle={title}
                    handleClose={handleClose}
                    openDialog={pointPassedDialogOpen}
                    form={form}
                />

                <DialogWindow
                    dialogTitle={title}
                    fullWidth={true}
                    maxWidth="md"
                    handleClose={handleClose}
                    openDialog={invoiceInfoDialogOpen}
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
            </Paper>
        </div>
    );
});