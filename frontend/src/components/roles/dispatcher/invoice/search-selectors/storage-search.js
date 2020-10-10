import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";


export default function StorageSearch(props) {
    const {title = "Storages", prevStorage, onStorageSelect, storages} = props;

    const [inputValue, setInputValue] = useState("");
    const [selectedStorage, setSelectedStorage] = useState(prevStorage);

    return (
        <Autocomplete
            id={"storage_autocomplete_field" + {title}}
            value={selectedStorage}
            onChange={(event, newValue) => {
                setSelectedStorage(newValue);
                onStorageSelect(newValue, title);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            getOptionLabel={(storage) => storage === "" ? "" : `${storage.address.city}  ${storage.address.street}   ${storage.address.house}`}
            options={storages}
            renderInput={(params) => <TextField {...params} label={title} fullWidth/>}
        />
    )
}