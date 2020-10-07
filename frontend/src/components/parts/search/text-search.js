import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

export default function TextSearch(props) {
    const {onFieldChange} = props;
    const [searchStr, setSearchStr] = useState("");

    const handleSearchFieldChange = (event) => {
        setSearchStr(event.target.value);
        onFieldChange(event.target.value);
    };

    return (
        <TextField
            id="text_search"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                ),
            }}
            value={searchStr}
            onChange={handleSearchFieldChange}
        />);
}
