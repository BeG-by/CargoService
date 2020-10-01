import Paper from "@material-ui/core/Paper";
import React from "react";
import {List} from "material-ui";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import DriverMap from "../../../map/driver-map";
import {convertPointsFromBackendApi} from "../../../map/utils";
import {connect} from "react-redux";
import ManagerMapForPointsView from "../../../map/manager-map-for-points-view";

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};


export const WaybillInfoContent = connect(mapStateToProps)((props) => {
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
                                        {props.waybill.invoice.number}
                                    </React.Fragment>
                                }
                            />
                            <ListItemIcon>
                                <CheckCircleIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Auto"
                                secondary={
                                    <React.Fragment>
                                        {props.waybill.auto.mark} {props.waybill.auto.type}
                                    </React.Fragment>
                                }
                            />
                            <ListItemIcon>
                                <CheckCircleIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Driver"
                                secondary={
                                    <React.Fragment>
                                        {props.waybill.driver.name} {props.waybill.driver.surname}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                            <ListItemIcon>
                                <DepartureBoardIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Departure Date"
                                secondary={
                                    <React.Fragment>
                                        {props.waybill.departureDate}
                                    </React.Fragment>
                                }
                            />
                            <ListItemIcon>
                                <DepartureBoardIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Arrival Date"
                                secondary={
                                    <React.Fragment>
                                        {props.waybill.arrivalDate}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <ListItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                            <ListItemIcon>
                                <HowToRegIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Shipper"
                                secondary={
                                    <React.Fragment>
                                        {props.waybill.shipper}
                                    </React.Fragment>
                                }
                            />
                            <ListItemIcon>
                                <HowToRegIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Consignee"
                                secondary={
                                    <React.Fragment>
                                        {props.waybill.consignee}
                                    </React.Fragment>
                                }
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
            </Paper>
        </div>
    );
})

export default WaybillInfoContent;