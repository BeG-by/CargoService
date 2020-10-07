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
import StoreIcon from '@material-ui/icons/Store';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {DialogWindow} from "../../parts/dialogs/dialog";
import Divider from "@material-ui/core/Divider";
import {InvoiceInfo} from "../manager/invoice-info";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import {UserInfo} from "../admin/user-info";
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/core/styles/makeStyles";

const mapStateToProps = (store) => {
    return {
        role: store.user.roles[0]
    }
};

const useStyles = makeStyles((theme) => ({
    infoPiece: {
        flexDirection: "column",
        alignItems: "flex-start"
    },
    half: {
        width: "50%",
    },
    centerButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }
}));

export const WaybillInfoContent = connect(mapStateToProps)((props) => {
    const styles = useStyles();
    const role = props.role;
    const waybill = props.waybill;
    const invoice = waybill.invoice;
    const [form, setForm] = React.useState(null);
    const [invoiceInfoDialogOpen, setInvoiceInfoDialogOpen] = React.useState(false);
    const [userInfoDialogOpen, setUserInfoDialogOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");

    console.log(waybill)

    const handleClose = () => {
        setInvoiceInfoDialogOpen(false);
        setUserInfoDialogOpen(false);
    };

    const handleInvoiceInfoOpen = () => {
        if (invoice) {
            setForm(<InvoiceInfo invoiceId={invoice.id}/>);
            setTitle("Invoice # " + invoice.number);
            setInvoiceInfoDialogOpen(true);
        }
    }

    const handleDriverInfoOpen = () => {
        const user = waybill.driver;
        if (user) {
            setForm(<UserInfo user={user}/>);
            setTitle("Driver");
            setUserInfoDialogOpen(true);
        }
    }

    const handleManagerInfoOpen = () => {
        const user = waybill.checkingUser;
        if (user) {
            setForm(<UserInfo user={user}/>);
            setTitle("Manager");
            setUserInfoDialogOpen(true);
        }
    }

    return (
        <div>
            <div className="info-content">
                <div className="info-content-column">
                    <Paper className={`${styles.infoPiece} table-paper`} style={{minWidth: "35%"}}>
                        <List className="info-content">
                            <div className="info-content-row">
                                <ListItem className="info-content-column">
                                    <div className={styles.half}>
                                        <ListItemIcon>
                                            <HowToRegIcon/>
                                        </ListItemIcon>
                                        <Tooltip className="link-pointer"
                                                 title="Click to see Driver info"
                                                 arrow>
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
                                    </div>

                                    <div className={styles.half}>
                                        <ListItemIcon>
                                            <HowToRegIcon/>
                                        </ListItemIcon>
                                        <Tooltip className="link-pointer"
                                                 title="Click to see Manager info"
                                                 arrow>
                                            <ListItemText
                                                onClick={handleManagerInfoOpen}
                                                primary={
                                                    <React.Fragment>
                                                        <strong style={{color: "#3f51b5"}}>
                                                            {waybill.checkingUser.name + " "
                                                            + waybill.checkingUser.surname}
                                                        </strong>
                                                    </React.Fragment>
                                                }
                                                secondary="Manager"
                                            />
                                        </Tooltip>
                                    </div>
                                </ListItem>
                                <Divider/>

                                <ListItem className="info-content-column">
                                    <div className={styles.half}>
                                        <ListItemIcon>
                                            <LocalShippingIcon/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <React.Fragment>
                                                    {waybill.auto.mark}
                                                </React.Fragment>
                                            }
                                            secondary="Auto mark"
                                        />
                                    </div>

                                    <div className={styles.half}>
                                        <ListItemIcon>
                                            <LocalShippingIcon/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <React.Fragment>
                                                    {waybill.auto.type}
                                                </React.Fragment>
                                            }
                                            secondary="Auto type"
                                        />
                                    </div>
                                </ListItem>
                                <Divider/>

                                <ListItem className="info-content-column">
                                    <div className={styles.half}>
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
                                    </div>

                                    <div className={styles.half}>
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
                                    </div>
                                </ListItem>
                                <Divider/>

                                <ListItem className="info-content-column">
                                    <div className={styles.half}>
                                        <ListItemIcon>
                                            <StoreIcon/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <React.Fragment>
                                                    {`${waybill.shipper.address.country}  ${waybill.shipper.address.city}  ${waybill.shipper.address.street}`}
                                                </React.Fragment>
                                            }
                                            secondary="Shipper"
                                        />
                                    </div>

                                    <div className={styles.half}>
                                        <ListItemIcon>
                                            <StoreIcon/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <React.Fragment>
                                                    {`${waybill.consignee.address.country}  ${waybill.consignee.address.city}  ${waybill.consignee.address.street}`}
                                                </React.Fragment>
                                            }
                                            secondary="Consignee"
                                        />
                                    </div>
                                </ListItem>
                            </div>
                        </List>

                        <div className={styles.centerButton}>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={handleInvoiceInfoOpen}>
                                {"See invoice info"}
                            </Button>
                        </div>
                    </Paper>

                    <Paper className={`${styles.infoPiece} table-paper`}
                           style={{padding: 20}}>
                        {role === "DRIVER" ?
                            <DriverMap
                                markers={convertPointsFromBackendApi(waybill.points)}
                                onMarkerPass={props.onUpdatePoint}
                            />
                            :
                            <ManagerMapForPointsView
                                markers={convertPointsFromBackendApi(waybill.points)}
                            />
                        }
                    </Paper>
                </div>
            </div>

            <DialogWindow
                dialogTitle={title}
                fullWidth={true}
                maxWidth="xl"
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
        </div>
    );
})

export default WaybillInfoContent;