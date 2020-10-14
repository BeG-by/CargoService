import React, {useState} from "react";
import {InfoWindow} from "@react-google-maps/api";
import Button from "@material-ui/core/Button";
import AbstractMap from "./abstract-map";

const NO_MATTER_NUMBER = -1;

export default function ManagerMapForPointAdding(props) {
    const markers = props.markers;
    const onMarkerAdd = props.onMarkerAdd;
    const onMarkerDelete = props.onMarkerDelete;

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(NO_MATTER_NUMBER);

    const handleMarkerDelete = (marker) => {
        setSelectedMarker(null);
        onMarkerDelete(marker);
    }

    const handleMarkerAdd = (markerInfo) => {
        setSelectedMarker(null);
        onMarkerAdd(markerInfo);
    }

    const handleMarkerClick = (marker, markerIndex) => {
        setSelectedMarker(marker);
        setSelectedMarkerIndex(markerIndex + 1);
    }

    const InfoWindowComponent = (
        selectedMarker === null ? null :
            <InfoWindow
                position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
                onCloseClick={() => setSelectedMarker(null)}
            >
                <div>
                    <h2>{`[${selectedMarkerIndex}] Point`}</h2>
                    <Button onClick={() => handleMarkerDelete(selectedMarker)}>
                        Delete point
                    </Button>
                </div>
            </InfoWindow>);


    return (
        <AbstractMap
            markers={markers}
            onMapClick={handleMarkerAdd}
            onMarkerClick={handleMarkerClick}
            infoWindowComponent={InfoWindowComponent}
        />)
}