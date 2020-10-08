import React, {useState} from "react";
import {InfoWindow} from "@react-google-maps/api";
import AbstractMap from "./abstract-map";
import {dateToString} from "./utils";

export default function ManagerMapForPointsView(props) {
    const markers = props.markers;

    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    }

    const InfoWindowComponent = (
        selectedMarker === null ? null :
            <InfoWindow
                position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
                onCloseClick={() => setSelectedMarker(null)}
            >
                {selectedMarker.isPassed ?
                    <h2>{`${dateToString(selectedMarker.passageDate)}`}</h2>
                    :
                    <h2>Not passed</h2>}
            </InfoWindow>);


    return (
        <AbstractMap
            markers={markers}
            onMapClick={() => setSelectedMarker(null)}
            onMarkerClick={handleMarkerClick}
            infoWindowComponent={InfoWindowComponent}
        />)
}