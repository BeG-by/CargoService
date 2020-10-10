import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";


export default function PersonSearch(props) {

    const {persons, onPersonSelect, label} = props;

    const [inputValue, setInputValue] = useState("");
    const [selectedPerson, setSelectedPerson] = useState("");

    return (
        <Autocomplete
            value={selectedPerson}
            onChange={(event, newValue) => {
                setSelectedPerson(newValue);
                onPersonSelect(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            getOptionLabel={(person) => person === "" ? "" : `${person.name} ${person.surname}`}
            options={persons}
            renderInput={(params) => <TextField {...params} label={label}/>}
        />
    )
}