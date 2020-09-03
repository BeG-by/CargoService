import React, {forwardRef} from "react";
import TtnForm from "../../forms/ttn-form";
import MaterialTable from "material-table";
import {DialogWindow} from "../../parts/dialog";
import {OkButton} from "../../parts/buttons/ok-button";
import {assignVerificationDN} from "../../parts/dialogs/verify-dn";
import {assignFillingWB} from "../../parts/dialogs/fill-wb";

export default function MainBodyManager(props) {
    const tableIcons = props.tableIcons;
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const [state, setState] = React.useState({
        columns: [
            {title: '#', field: 'number'},
            {title: 'Date', field: 'date'},
            {title: 'Status', field: 'status'},
            {title: 'Waybill', field: 'waybill'}
        ],
        data: [
            {
                number: '001',
                date: '2020-09-09',
                status: 'registered',
                waybill: ''
            },
            {
                number: '002',
                date: '2020-09-01',
                status: 'closed',
                waybill: '222'
            },
            {
                number: '003',
                date: '2020-09-05',
                status: 'verified',
                waybill: '333'
            },
            {
                number: '004',
                date: '2020-09-08',
                status: 'declined',
                waybill: ''
            },
            {
                number: '005',
                date: '2020-09-05',
                status: 'verified',
                waybill: ''
            },
        ],
    } || null);


//примеры содержимого диалоговых окон (вынести куда-нибудь)
    const [form, setForm] = React.useState(null);

    return (
        <div>
            <MaterialTable
                title="Delivery Notes"
                icons={tableIcons}
                columns={state.columns}
                data={state.data}
                options={{
                    actionsColumnIndex: -1
                }}
                onRowClick={(event, rowData) => {
                    localStorage.setItem('number', rowData.number);
                    localStorage.setItem('status', rowData.status);
                    localStorage.setItem('waybill', rowData.waybill);
                    if (rowData.status === 'registered') {
                        window.location.href = '/deliveryNote';
                    } else if (rowData.status === 'verified' && !rowData.waybill.trim()) {
                        setForm(assignFillingWB);
                        setOpenDialog(true);
                    } else {
                        window.location.href = '/deliveryNote';
                    }
                }}
            />
            <DialogWindow
                dialogTitle="Confirmation"
                handleClose={handleClose}
                openDialog={openDialog}
                form={form}/>
        </div>
    );
}