import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    menuColumn: {
        minWidth: 60,
        fontSize: 18,
        color: "#3f51b5"
    }
}));

export default function EnhancedTableHead(props) {
    const classes = useStyles();
    const {order, orderBy, onRequestSort, firstMenu, secondMenu, thirdMenu} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {firstMenu ?
                    <TableCell
                        key={"edit-delete"}
                        className={classes.menuColumn}
                    />
                    : null}
                {props.columns.map((column) => {


                    let label = column.label;

                    if (column.id === "consumption" || column.id === "maxLoad") {

                        const notice = column.id === "consumption" ? "Liter / 100 km" : "KG";
                        label =
                            <Tooltip title={notice} arrow>
                                <div>{column.label}</div>
                            </Tooltip>;

                    }


                    return (
                        <TableCell
                            key={column.id}
                            style={{
                                minWidth: column.minWidth,
                                width: column.width,
                                maxWidth: column.maxWidth,
                                align: column.align,
                                fontSize: column.fontSize,
                                color: "#3f51b5"
                            }}
                            sortDirection={orderBy === column.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === column.id}
                                direction={orderBy === column.id ? order : 'asc'}
                                onClick={createSortHandler(column.id)}
                            >
                                {label}
                                {orderBy === column.id
                                    ? <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                  </span>
                                    : null}
                            </TableSortLabel>
                        </TableCell>
                    )
                })}
                {secondMenu ?
                    <TableCell
                        key={"show"}
                        className={classes.menuColumn}
                    >
                        Info
                    </TableCell>
                    : null}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    firstMenu: PropTypes.bool,
    secondMenu: PropTypes.bool
};