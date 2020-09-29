import React, {useCallback, useRef, useState} from "react";
import {GoogleMap, InfoWindow, Marker, OverlayView, useLoadScript} from "@react-google-maps/api";
import Button from "@material-ui/core/Button";
import MarkersList from "./markers-list";
import Grid from "@material-ui/core/Grid";
import {dateToString} from "./utils";

const libraries = ["places"];
const mapContainerStyle = {width: 750, height: 500}
const options = {disableDefaultUI: true};
const startCenter = {lat: 43.6, lng: -79};
const startZoom = 8;


export default function Map() {
    const {isLoaded, loadError} = useLoadScript({
        // googleMapsApiKey: "AIzaSyD-6ol1cr4yDAHO-c7M4_XQKvQIbJC6cxs",
        libraries,
    });

    const [center, setCenter] = useState(startCenter)
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markerIndex, setMarkerIndex] = useState(0);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);


    const handleMarkerDelete = (marker) => {
        for (let i = 0; i < markers.length; i++) {
            if (marker.index === markers[i].index) {
                setSelectedMarker(null);
                setMarkers(prevState => {
                    let markers = prevState;
                    markers.splice(i, 1);
                    return markers;
                })
            }
        }
    }

    const handleMarkerPass = (marker) => {
        marker.isPassed = true;
        marker.passageDate = new Date();
        for (let i = 0; i < markers.length; i++) {
            if (marker.index === markers[i].index) {
                setMarkers(prevState => {
                    let markers = prevState;
                    markers[i] = marker;
                    return markers;
                })
                setSelectedMarker(null);
            }
        }
    }

    const onMapClick = useCallback((event) => {
        console.log(event);
        setMarkers(prevState => [...prevState, {
            isPassed: false,
            passageDate: null,
            index: markerIndex,
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        }])
        setSelectedMarker(null);
        setMarkerIndex(markerIndex + 1);
    }, [markerIndex]);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={startZoom}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map(marker =>
                    <Marker
                        key={`${marker.lng}_${marker.lat}`}
                        position={{lat: marker.lat, lng: marker.lng}}
                        onClick={() => {
                            setSelectedMarker(marker)
                        }}
                        icon={marker.isPassed ?
                            "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                            :
                            "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
                    />
                )}

                {selectedMarker === null ? null :
                    <InfoWindow
                        position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
                        onCloseClick={() => setSelectedMarker(null)}>
                        <div>
                            {selectedMarker.isPassed ?
                                <div>
                                    <h2> Passed</h2>
                                    <h3>{dateToString(selectedMarker.passageDate)}</h3>
                                </div>
                                :
                                <h2>Not passed</h2>
                            }

                            <Button onClick={() => {
                                handleMarkerDelete(selectedMarker)
                            }}>
                                Delete
                            </Button>
                            <Button onClick={() => {
                                handleMarkerPass(selectedMarker)
                            }}>
                                Pass
                            </Button>
                        </div>
                    </InfoWindow>}


            </GoogleMap>
            <MarkersList
                items={markers}
                listName={"Markers"}
                onRowClick={(item) => setCenter(item)}
            />
        </div>
    )
}

