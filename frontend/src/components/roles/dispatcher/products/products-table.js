import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
    {label: "Name", id: "name", minWidth: 100, maxWidth: 100},
    {label: "Mass", id: "mass", minWidth: 100, maxWidth: 100},
    {label: "Mass measure", id: "massMeasure", minWidth: 100, maxWidth: 100},
    {label: "Quantity", id: "quantity", minWidth: 100, maxWidth: 100},
    {label: "Quantity measure", id: "quantityMeasure", minWidth: 100, maxWidth: 100},
    {label: "Price", id: "price", minWidth: 100, maxWidth: 100},
    {label: "Currency", id: "currency", minWidth: 100, maxWidth: 100},
    {label: "Sum", id: "sum", minWidth: 100, maxWidth: 100},
];

const fetchFieldFromObject = (obj, prop) => {
    if (obj === undefined || obj === null) {
        return null;
    }

    let index = prop.indexOf(".");
    if (index > -1) {
        return fetchFieldFromObject(
            obj[prop.substring(0, index)],
            prop.substr(index + 1)
        );
    }

    return obj[prop];
};

const useStyles = makeStyles({
    root: {
        // width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

export default (props) => {
    const onRowClick = props.onRowClick;
    const products = props.products;
    const changeTotal = props.onAddProduct;

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const TOTAL = {
        BYN: 0,
        USD: 0,
        EURO: 0,
        RUB: 0,
        weight: 0
    };

    useEffect(() => {
        changeTotal(TOTAL);
    }, [props.products]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleTableRowClick = (product) => {
        onRowClick(product);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeTotal = (price, currency, weight, measure) => {
        TOTAL[currency] = TOTAL[currency] + price;
        
        switch (measure) {
            case "KG":
                TOTAL.weight = TOTAL.weight + weight;
                break;
            case "TON":
                TOTAL.weight = TOTAL.weight + 1000 * weight;
        }
        
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{maxWidth: column.maxWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => {

                                const sumRow = Number(product.quantity) * Number(product.price);
                                handleChangeTotal(sumRow, product.currency , Number(product.mass), product.massMeasure);

                                return (
                                    <TableRow
                                        onClick={() => {
                                            handleTableRowClick(product);
                                        }}
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={product.id}
                                    >
                                        {columns.map((column) => {

                                            let innerContent = column.id === "sum" ?
                                                sumRow + " " + product.currency :
                                                fetchFieldFromObject(product, column.id);

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {innerContent}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                            
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};
