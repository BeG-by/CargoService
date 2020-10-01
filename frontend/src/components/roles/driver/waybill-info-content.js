import Paper from "@material-ui/core/Paper";
import React from "react";
import {List} from "material-ui";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import DriverMap from "../../../map/driver-map";
import {convertPointsFromBackendApi} from "../../../map/utils";
import ManagerMapForPointsView from "../../../map/manager-map-for-points-view";
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

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

export const WaybillInfoContent = connect(mapStateToProps)((props) => {
    const role = props.role;
    const waybill = props.waybill;
    const [form, setForm] = React.useState(null);
    const [invoiceInfoDialogOpen, setInvoiceInfoDialogOpen] = React.useState(false);
    const [userInfoDialogOpen, setUserInfoDialogOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");

    const handleClose = () => {
        setInvoiceInfoDialogOpen(false);
        setUserInfoDialogOpen(false);
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
      
                {props.role === "DRIVER" ?
                    <DriverMap
                        markers={convertPointsFromBackendApi(props.waybill.points)}
                        onMarkerPass={props.onUpdatePoint}
                    />
                    :
                    <ManagerMapForPointsView
                        markers={convertPointsFromBackendApi(props.waybill.points)}
                    />
                }

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
})

export default WaybillInfoContent;
