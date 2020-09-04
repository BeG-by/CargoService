import React from 'react';
import MaterialTable from 'material-table';
import {DialogWindow} from "../../parts/dialog";
import InvoiceForm from "../../forms/invoice-form";

export default function MainBodyDispatcher(props) {
    const tableIcons = props.tableIcons;
    const [openTtnDialog, setOpenTtnDialog] = React.useState(false);
    const handleClickOpenTtn = () => {
        setOpenTtnDialog(true);
    };
    const handleCloseTtn = () => {
        setOpenTtnDialog(false);
    };

    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Address', field: 'address' },
            { title: 'Phone', field: 'phone' },
            { title: 'Contact', field: 'contact' }
        ],
        data: [
            { name: 'Gippo',
                address: 'Minsk, Lenina 12a',
                phone: '+375(29)321-26-23',
                contact: 'Oleg Ivanov' },
            { name: "Belmarket",
                address: 'Minsk, Russiyanova 45',
                phone: '+375(33)452-23-58',
                contact: 'Irina Zaytseva' }
        ],
    } || null);

    const form = <InvoiceForm/>;

    return (
        <div>
            <MaterialTable
                title="Clients"
                icons={tableIcons}
                columns={state.columns}
                data={state.data}
                options={{
                    actionsColumnIndex: -1
                }}
                actions={[
                    {
                        tooltip: 'Fill TTN',
                        icon: tableIcons.Check,
                        onClick: (evt, data) => handleClickOpenTtn()
                    }
                ]}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                            }, 500);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 500);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                            }, 500);
                        }),
                }}
            />
            <DialogWindow
                dialogTitle="Fill TTN:"
                handleClose={handleCloseTtn}
                openDialog={openTtnDialog}
                form={form}/>
        </div>
    );
}