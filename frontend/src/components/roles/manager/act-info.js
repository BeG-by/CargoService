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
import fetchFieldFromObject from "../../parts/util/fetch-field-from-object";
import TablePagination from "@material-ui/core/TablePagination";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import StoreIcon from '@material-ui/icons/Store';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import Divider from "@material-ui/core/Divider";
import EnhancedTableHead, {getComparator, stableSort} from "../../parts/util/sorted-table-head";
import {countTotalQuantity, countTotalSum, countTotalWeight, CURRENCY} from "../../parts/util/cargo-total-info";
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
    boldText: {
        fontWeight: "bold",
    },
    tableHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5,
        fontSize: 20
    },
    fsize: {
        fontSize: 12,
        fontWeight: "bold"
    }
}));

const columns = [
    {label: "Name", id: "name", width: 100},
    {label: "Mass", id: "mass", width: 50},
    {label: "Measure", id: "massMeasure", width: 50},
    {label: "Price", id: "price", width: 50},
    {label: "Currency", id: "currency", width: 50},
    {label: "Quantity", id: "quantity", width: 50},
    {label: "Measure", id: "quantityMeasure", width: 50},
    {label: "Lost", id: "lostQuantity", width: 50},
    {label: "Comment", id: "comment", width: 50},
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

    const totalSum = countTotalSum(losses);
    const totalWeight = countTotalWeight(losses);
    const totalQuantity = countTotalQuantity(losses);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('status');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

    return (
        <div>
            <Paper className="table-paper">
                <List className="info-content">
                    <div className="info-content-column">
                        <ListItem className={styles.infoPiece}>
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
                        Quantity :
                    </TableCell>
                    <TableCell align="right"
                               className={styles.boldText}>
                        {totalQuantity + " items"}
                    </TableCell>
                    <TableCell colSpan={1}>
                        Weight :
                    </TableCell>
                    <TableCell align="right"
                               className={styles.boldText}>
                        {totalWeight + " KG"}
                    </TableCell>
                    <TableCell colSpan={1}>
                        Total Sum :
                    </TableCell>
                    <TableCell align="right"
                               className={styles.boldText}>
                        {totalSum + " " + CURRENCY}
                    </TableCell>
                </TableRow>
            </div>

                <TableContainer>
                    <Table
                        aria-label="sticky table">
                        <EnhancedTableHead
                            fsize={styles.fsize}
                            menu={false}
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