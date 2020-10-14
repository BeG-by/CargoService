import React, {useState} from "react";
import {InfoWindow} from "@react-google-maps/api";
import AbstractMap from "./abstract-map";
import {dateToString} from "./utils";

const NOT_MATTER_NUMBER = -1;

export default function ManagerMapForPointsView(props) {
    const markers = props.markers;

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(NOT_MATTER_NUMBER);

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
                {selectedMarker.isPassed ?
                    <div>
                        <h2>{`[${selectedMarkerIndex}] Point`}</h2>
                        <h3>{dateToString(selectedMarker.passageDate)}</h3>
                    </div>
                    :
                    <div>
                        <h2>{`[${selectedMarkerIndex}] Point`}</h2>
                        <h3>{"Not passed"}</h3>
                    </div>
                }
            </InfoWindow>);


    return (
        <AbstractMap
            markers={markers}
            onMapClick={() => setSelectedMarker(null)}
            onMarkerClick={handleMarkerClick}
            infoWindowComponent={InfoWindowComponent}
        />)
}