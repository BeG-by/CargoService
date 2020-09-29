import React, {useState} from "react";
import {InfoWindow} from "@react-google-maps/api";
import AbstractMap from "./abstract-map";

export default function ManagerMapForPointAdding(props) {
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
                <h2>{`Marker ${selectedMarker.index}`}</h2>
            </InfoWindow>);


    return (
        <AbstractMap
            markers={markers}
            onMapClick={() => setSelectedMarker(null)}
            onMarkerClick={handleMarkerClick}
            infoWindowComponent={InfoWindowComponent}
        />)
}