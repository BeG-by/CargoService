import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";


export default function AutoSearch(props) {
    const autoArr = props.autoArr;
    const onAutoSelect = props.onAutoSelect;

    const [inputValue, setInputValue] = useState("");
    const [selectedAuto, setSelectedAuto] = useState("");

    return (
        <Autocomplete
            value={selectedAuto}
            onChange={(event, newValue) => {
                setSelectedAuto(newValue);
                onAutoSelect(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            getOptionLabel={(auto) => auto === "" ? "" : `${auto.mark} ${auto.autoType} ${auto.maxLoad}`}
            options={autoArr}
            renderInput={(params) => <TextField {...params} label={"Auto"}/>}
        />
    )
}