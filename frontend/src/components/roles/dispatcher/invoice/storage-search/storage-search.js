import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";


export default function StorageSearch(props) {
    const storages = props.storages;
    const onStorageSelect = props.onStorageSelect;
    const prevStorage = props.prevStorage;

    const [inputValue, setInputValue] = useState("");
    const [selectedStorage, setSelectedStorage] = useState(prevStorage);

    return (
        <Autocomplete
            id={"storage_autocomplete_field"}
            value={selectedStorage}
            onChange={(event, newValue) => {
                setSelectedStorage(newValue);
                onStorageSelect(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            getOptionLabel={(storage) => storage === "" ? "" : `${storage.address.country}  ${storage.address.city}  ${storage.address.street}   ${storage.email}  ${storage.phone}`}
            options={storages}
            renderInput={(params) => <TextField {...params} label="Storages" fullWidth/>}
        />
    )
}