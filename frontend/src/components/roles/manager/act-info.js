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
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import fetchFieldFromObject from "../../parts/util/function-util";
import TablePagination from "@material-ui/core/TablePagination";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import StoreIcon from '@material-ui/icons/Store';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import Divider from "@material-ui/core/Divider";
import EnhancedTableHead, {getComparator, stableSort} from "../../parts/util/sorted-table-head";
import {countTotalLostQuantity, countTotalLostSum, countTotalWeight} from "../../parts/util/cargo-total-info";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {UserInfo} from "../admin/user-info";
import Tooltip from "@material-ui/core/Tooltip";
import {DialogWindow} from "../../parts/dialogs/dialog";

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
    boldText: {
        fontWeight: "bold",
    },
    tableHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5,
        fontSize: 20
    }
}));

const LEFT = "left";
const SIZE = 12;

const columns = [
    {label: "Name", id: "name", minWidth: 100, align: LEFT, fontSize: SIZE},
    {label: "Mass", id: "mass", minWidth: 50, maxWidth: 60, align: LEFT, fontSize: SIZE},
    {label: "Measure", id: "massMeasure", minWidth: 50, maxWidth: 60, align: LEFT, fontSize: SIZE},
    {label: "Price", id: "price", minWidth: 50, maxWidth: 60, align: LEFT, fontSize: SIZE},
    {label: "Currency", id: "currency", minWidth: 50, maxWidth: 60, align: LEFT, fontSize: SIZE},
    {label: "Quantity", id: "quantity", minWidth: 50, maxWidth: 60, align: LEFT, fontSize: SIZE},
    {label: "Measure", id: "quantityMeasure", minWidth: 50, maxWidth: 60, align: LEFT, fontSize: SIZE},
    {label: "Lost", id: "lostQuantity", minWidth: 50, maxWidth: 60, align: LEFT, fontSize: SIZE},
    {label: "Comment", id: "comment", minWidth: 50, align: LEFT, fontSize: SIZE},
];

export const ActInfo = connect(mapStateToProps)((props) => {
    const styles = useStyles();
    const invoice = props.invoice;
    const act = props.act;

    const losses = [];
    invoice.products.forEach(p => {
        if (p.lostQuantity > 0) {
            losses.push(p);
        }
    })

    const totalLostSum = countTotalLostSum(losses);
    const totalWeight = countTotalWeight(losses);
    const totalLostQuantity = countTotalLostQuantity(losses);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('status');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [form, setForm] = React.useState(null);
    const [title, setTitle] = React.useState("");
    const [userInfoDialogOpen, setUserInfoDialogOpen] = React.useState(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDriverInfoOpen = () => {
        const user = invoice.driver;
        if (user) {
            setForm(<UserInfo user={user}/>);
            setTitle("Driver");
            setUserInfoDialogOpen(true);
        }
    }

    const handleClose = () => {
        setUserInfoDialogOpen(false);
    };

    return (
        <div>
            <Paper className="table-paper">
                <List className="info-content">
                    <div className="info-content-column">
                        <ListItem className={styles.infoPiece}>
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
                        <ListItem className={styles.infoPiece}>
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
                        <ListItem className={styles.infoPiece}>
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

                <Typography variant="h6"
                            gutterBottom
                            className={styles.tableHeader}>
                    LOST CARGO
                </Typography>

            <div className={styles.tableHeader}>
                <TableRow>
                    <TableCell colSpan={1}>
                        Owner :
                    </TableCell>
                    <TableCell align="right"
                               className={styles.boldText}>
                        {invoice.productOwnerDTO.name}
                    </TableCell>
                    <TableCell colSpan={1}>
                        Lost items :
                    </TableCell>
                    <TableCell align="right"
                               className={styles.boldText}>
                        {totalLostQuantity + " items"}
                    </TableCell>
                    <TableCell colSpan={1}>
                        Lost weight :
                    </TableCell>
                    <TableCell align="right"
                               className={styles.boldText}>
                        {totalWeight + " KG"}
                    </TableCell>
                    <TableCell colSpan={1}>
                        Lost Sum :
                    </TableCell>
                    <TableCell align="right"
                               className={styles.boldText}>
                        {totalLostSum + " " + (invoice.currency ? invoice.currency : "")}
                    </TableCell>
                </TableRow>
            </div>

                <TableContainer>
                    <Table
                        aria-label="sticky table">
                        <EnhancedTableHead
                            firstMenu={false}
                            secondMenu={false}
                            columns={columns}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(losses, getComparator(order, orderBy))
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
                                                    <TableCell key={column.id}
                                                               align={column.align}
                                                               style={{minWidth: column.minWidth, maxWidth: column.maxWidth}}>
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