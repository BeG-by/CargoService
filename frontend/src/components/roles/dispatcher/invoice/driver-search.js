import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";


export default function DriverSearch(props) {
    const drivers = props.drivers;
    const onDriverSelect = props.onDriverSelect;

    const [inputValue, setInputValue] = useState("");
    const [selectedDriver, setSelectedDriver] = useState("");

    return (
        <Autocomplete
            id={"driver_autocomplete_field"}
            value={selectedDriver}
            onChange={(event, newValue) => {
                setSelectedDriver(newValue);
                onDriverSelect(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            getOptionLabel={(driver) => driver === "" ? "" : `${driver.name} ${driver.surname}`}
            options={drivers}
            renderInput={(params) => <TextField {...params} label="Drivers"/>}
        />
    )
}