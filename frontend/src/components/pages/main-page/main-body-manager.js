// import React from "react";
// import MaterialTable from "material-table";
// import { DialogWindow } from "../../parts/dialog";
// import { assignFillingWaybill } from "../../parts/dialogs/fill-waybill";
//
// export default function MainBodyManager(props) {
//   const tableIcons = props.tableIcons;
//   const [openDialog, setOpenDialog] = React.useState(false);
//   const [form, setForm] = React.useState(null);
//   const [state, setState] = React.useState(
//     {
//       columns: [
//         { title: "#", field: "number" },
//         { title: "Date", field: "date" },
//         { title: "Status", field: "status" },
//         { title: "Waybill", field: "waybill" },
//       ],
//       data: [
//         {
//           number: "001",
//           date: "2020-09-09",
//           status: "registered",
//           waybill: "",
//         },
//         {
//           number: "002",
//           date: "2020-09-01",
//           status: "closed",
//           waybill: "222",
//         },
//         {
//           number: "003",
//           date: "2020-09-05",
//           status: "verified",
//           waybill: "333",
//         },
//         {
//           number: "004",
//           date: "2020-09-08",
//           status: "declined",
//           waybill: "",
//         },
//         {
//           number: "005",
//           date: "2020-09-05",
//           status: "verified",
//           waybill: "",
//         },
//       ],
//     } || null
//   );
//
//   const handleClose = () => {
//     setOpenDialog(false);
//   };
//
//   return (
//     <div>
//       <MaterialTable
//         style={{ minWidth: 600 }}
//         title="Invoices"
//         icons={tableIcons}
//         columns={state.columns}
//         data={state.data}
//         onRowClick={(event, rowData) => {
//           localStorage.setItem("number", rowData.number);
//           localStorage.setItem("status", rowData.status);
//           localStorage.setItem("waybill", rowData.waybill);
//           if (rowData.status === "verified" && !rowData.waybill.trim()) {
//             setForm(assignFillingWaybill);
//             setOpenDialog(true);
//           } else {
//             window.location.href = "/invoice";
//           }
//         }}
//       />
//       <DialogWindow
//         dialogTitle="Confirmation"
//         handleClose={handleClose}
//         openDialog={openDialog}
//         form={form}
//       />
//     </div>
//   );
// }

import React from "react";
import InvoicesTable from "../../parts/invoices-table-and-form/invoices-table";

export default function MainBodyManager() {
    return <div>
        <InvoicesTable/>
    </div>
}