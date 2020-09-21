import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import CheckIcon from "@material-ui/icons/Check";
import fetchFieldFromObject from "../fetch-field-from-object";

const columns = [
    { label: "Place", id: "place", minWidth: 150 },
    { label: "Passage Date", id: "passageDate", minWidth: 150 },
    { label: "Passed", id: "passed", minWidth: 150 },
];

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

export default (props) => {
    const onRowClick = props.onRowClick;
    const points = props.points;

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleTableRowClick = (point) => {
        onRowClick(point);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {points
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
                                            return (
                                                <TableCell key={column.id}>
                                                    {column.id === 'passed' && fetchFieldFromObject(point, column.id)
                                                        ? <CheckIcon/>
                                                        : fetchFieldFromObject(point, column.id)}
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
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={points.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};