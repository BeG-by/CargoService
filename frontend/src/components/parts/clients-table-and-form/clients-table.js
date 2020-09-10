import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ClientDialog from "./client-dialog";
import { getAllClients } from "./request-utils";
import Button from "@material-ui/core/Button";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "type", label: "Company type", minWidth: 100 },
  {
    id: "payerAccountNumber",
    label: "Payer account number",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "address.country",
    label: "Country",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "registrationDate",
    label: "RegistrationDate",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function fetchFieldFromObject(obj, prop) {
  var index = prop.indexOf(".");
  if (index > -1) {
    return fetchFieldFromObject(
      obj[prop.substring(0, index)],
      prop.substr(index + 1)
    );
  }

  return obj[prop];
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function ClientsTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [clients, setClients] = React.useState([]);
  const [clientDialogOpen, setClientDialogOpen] = React.useState(false);
  const [selectedClientCompanyId, setSelectedClientCompanyId] = React.useState(
    -1
  );

  async function fetchClientsCompanies() {
    setClients(await getAllClients());
  }

  useEffect(() => {
    fetchClientsCompanies();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleTableRowClick = (client) => {
    setSelectedClientCompanyId(client.id);
    setClientDialogOpen(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreateNewClientCLick = () => {
    setClientDialogOpen(true);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client) => {
                  return (
                    <TableRow
                      onClick={() => {
                        handleTableRowClick(client);
                      }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={client.id}
                    >
                      {columns.map((column) => {
                        const value = fetchFieldFromObject(client, column.id);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
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

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        <ClientDialog
          open={clientDialogOpen}
          clientCompanyId={selectedClientCompanyId}
          onClose={() => {
            setClientDialogOpen(false);
            setSelectedClientCompanyId(-1);
            fetchClientsCompanies();
          }}
          onSubmit={() => {
            setClientDialogOpen(false);
            setSelectedClientCompanyId(-1);
            fetchClientsCompanies();
          }}
        />
      </Paper>
      <Button
        onClick={handleCreateNewClientCLick}
        variant="contained"
        color="primary"
      >
        Add new client
      </Button>
    </div>
  );
}
