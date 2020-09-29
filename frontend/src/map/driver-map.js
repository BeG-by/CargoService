import React, {useState} from "react";
import {InfoWindow} from "@react-google-maps/api";
import {dateToString} from "./utils";
import Button from "@material-ui/core/Button";
import AbstractMap from "./abstract-map";

export default function DriverMap(props) {
    const markers = props.markers;
    const onMarkerPass = props.onMarkerPass;

    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerPass = (marker) => {
        setSelectedMarker(null);
        onMarkerPass(marker);
    }

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    }

    const InfoWindowComponent = (
        selectedMarker === null ? null :
            <InfoWindow
                position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
                onCloseClick={() => setSelectedMarker(null)}
            >
                <div>
                    {selectedMarker.isPassed ?
                        <div>
                            <h2>Passed</h2>
                            <h3>{dateToString(selectedMarker.passageDate)}</h3>
                        </div>
                        :
                        <h2>Not passed</h2>
                    }

                    <Button onClick={() => handleMarkerPass(selectedMarker)}>
                        Pass point
                    </Button>
                </div>
            </InfoWindow>);


    return (
        <AbstractMap
            markers={markers}
            onMapClick={() => setSelectedMarker(null)}
            onMarkerClick={handleMarkerClick}
            infoWindowComponent={InfoWindowComponent}
        />)
}