import React, {useState} from "react";
import {InfoWindow} from "@react-google-maps/api";
import {dateToString} from "./utils";
import Button from "@material-ui/core/Button";
import AbstractMap from "./abstract-map";

const NO_MATTER_NUMBER = -1;

export default function DriverMap(props) {
    const markers = props.markers;
    const onMarkerPass = props.onMarkerPass;

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(NO_MATTER_NUMBER);

    const handleMarkerPass = (marker) => {
        setSelectedMarker(null);
        onMarkerPass(marker);
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
                    {selectedMarker.isPassed ?
                        <div>
                            <h2>{`[${selectedMarkerIndex}] Point`}</h2>
                            <h3>{dateToString(selectedMarker.passageDate)}</h3>
                        </div>
                        :
                        <div>
                            <h2>{`[${selectedMarkerIndex}] Point`}</h2>
                            <Button onClick={() => handleMarkerPass(selectedMarker)}>
                                Pass point
                            </Button>
                        </div>
                    }

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