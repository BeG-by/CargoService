import React, {useState} from 'react';
import MaterialTable from 'material-table';
import {forwardRef} from 'react';
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
import DeliveryNoEForm from "../../forms/ttn-form/delivery-note-form";

function handleRegisterDeliveryNoteClick(deliveryNote) {
    console.log(deliveryNote);
    alert("Registered")
}

export default function MainBodyDispatcher() {
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
    };

    //todo: get companies by GET request
    //todo: get drivers by GET request
    //todo: create state for user

    const drivers = [
        {id: "123", name: "Igor", lastName: "Surname"},
        {id: "321", name: "Denis", lastName: "Dush"}
    ]

    const user = {
        name: "Vlad",
        lastName: "Miron",
        patronymic: "Igorevich"
    }

    const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false);


    const [state, setState] = useState({
        columns: [
            {title: 'Name', field: 'name'},
            {title: 'Address', field: 'address'},
            {title: 'Phone', field: 'phone'},
            {title: 'Contact', field: 'contact'}
        ],
        data: [
            {
                name: 'Gippo',
                address: 'Minsk, Lenina 12a',
                phone: '+375(29)321-26-23',
                contact: 'Oleg Ivanov'
            },
            {
                name: "Belmarket",
                address: 'Minsk, Russiyanova 45',
                phone: '+375(33)452-23-58',
                contact: 'Irina Zaytseva'
            }
        ],
    });

    return (
        <div>
            {/*//todo: put it to another component */}
            <MaterialTable
                title="Clients"
                icons={tableIcons}
                columns={state.columns}
                data={state.data}
                actions={[
                    {
                        tooltip: 'Fill TTN',
                        icon: tableIcons.Check,
                        onClick: () => setDeliveryDialogOpen(true)
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
                                    return {...prevState, data};
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setState((prevState) => {
                                        console.log(prevState);
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return {...prevState, data};
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return {...prevState, data};
                                });
                            }, 600);
                        }),
                }}
            />

            <DeliveryNoEForm
                open={deliveryDialogOpen}
                onCloseClick={() => setDeliveryDialogOpen(false)}
                onRegisterClick={handleRegisterDeliveryNoteClick}

                name={user.name}
                lastName={user.lastName}
                patronymic={user.patronymic}
                drivers={drivers}
                clientCompany={{
                    name: "Google"
                }}
            />

        </div>
    )
        ;
}