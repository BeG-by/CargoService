import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {DialogWindow} from "../../parts/dialog";
import TtnForm from "../../forms/ttn-form";

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

    const form = <TtnForm/>;

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