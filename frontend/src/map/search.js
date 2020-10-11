import React from "react";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover,} from "@reach/combobox";

import "@reach/combobox/styles.css";
import "./map-styles.css"

const SEARCH_RADIUS = 300 * 1000;   //in meters

export default function Search(props) {
    const center = props.center;
    const onSelect = props.onSelect;

    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestsOptions: {
            location: {lat: () => center.lat, lng: () => center.lng},
            radius: SEARCH_RADIUS,
        }
    });

    const handleLocationSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
            const result = await getGeocode({address});
            const {lat, lng} = await getLatLng(result[0]);
            onSelect(lat, lng);
        } catch (e) {
            console.log("Cannot geocode")
        }
    }

    const handleInputChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="search">
            <Combobox onSelect={handleLocationSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInputChange}
                    disabled={!ready}
                    placeholder={"Enter address"}
                />
                <ComboboxPopover style={{zIndex: 9999}}>
                    <ComboboxList >
                        {status === "OK" && data.map(({id, description}) => {
                            return <ComboboxOption key={id} value={description}/>
                        })}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )

}