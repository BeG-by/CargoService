import React, {useState} from 'react';
import MaterialTable from "material-table";

let validateName = (name) => {
    if (name === '' || name === undefined) {
        return {isValid: false, helperText: ''}
    } else {
        return {isValid: true, helperText: ''};
    }
}

let validateAmountProducts = (amount) => {
    if (amount === '' || amount === undefined || Number.isNaN(amount)) {
        return {isValid: false, helperText: ''}
    } else {
        return {isValid: true, helperText: ''};
    }
}

let validatePriceForOneProduct = (price) => {
    if (price === '' || price === undefined || Number.isNaN(price)) {
        return {isValid: false, helperText: ''}
    } else {
        return {isValid: true, helperText: ''};
    }
}

let countPriceForAllProducts = (amountProducts, priceForOne) => {
    const accuracy = 3;
    return (amountProducts * priceForOne).toFixed(accuracy)
}

export default function ProductsTable() {
    const [state, setState] = useState({
        columns: [
            {
                title: 'Name',
                field: 'name',
                validate: rowData => validateName(rowData.name)
            },
            {
                title: 'Amount',
                field: 'amount',
                type: 'numeric',
                validate: rowData => validateAmountProducts(rowData.amount)
            },
            {
                title: 'Price for one',
                field: 'priceForOne',
                type: 'numeric',
                validate: rowData => validatePriceForOneProduct(rowData.priceForOne)
            },
            {
                title: 'Price for all',
                field: 'priceForAll',
                type: 'numeric',
                editable: "never"
            },
        ],

        //todo: put this data to the parent component and get it from props
        data: [
            {name: 'Bananas', amount: 3, priceForOne: 2, priceForAll: 6},
        ],
    });

    return (
        <MaterialTable
            title="Products table"
            columns={state.columns}
            data={state.data}

            //todo: get this methods from parent
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        resolve();
                        newData.priceForAll = countPriceForAllProducts(newData.amount, newData.priceForOne)
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data.push(newData);
                            return {...prevState, data};
                        });
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        resolve();
                        if (oldData) {
                            newData.priceForAll = countPriceForAllProducts(newData.amount, newData.priceForOne)
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return {...prevState, data};
                            });
                        }
                    }),

                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        resolve();
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return {...prevState, data};
                        });
                    }),
            }}
        />
    );
}