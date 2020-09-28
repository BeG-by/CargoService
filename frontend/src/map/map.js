import React, {useCallback, useRef, useState} from "react";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {width: "100vw", height: "100vh"}
const center = {lat: 43.6, lng: -79}
const options = {disableDefaultUI: true};

function Map() {
    const {isLoaded, loadError} = useLoadScript({
        // googleMapsApiKey: "API_KEY",
        libraries,
    });

    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);


    const onMapClick = useCallback((event) => {
        setSelectedMarker(null);
        setMarkers(prevState => [...prevState, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
        }])
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map(marker =>
                    <Marker
                        key={marker.time.toISOString()}
                        position={{lat: marker.lat, lng: marker.lng}}
                        onClick={() => {
                            setSelectedMarker(marker)
                        }}
                    />
                )}

                {selectedMarker === null ? null :
                    <InfoWindow
                        position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
                        onCloseClick={() => setSelectedMarker(null)}>
                        <div>
                            <h2>Mark</h2>
                            <p>Spotted: {selectedMarker.time.toISOString().slice(0, 10)}</p>
                        </div>
                    </InfoWindow>}
            </GoogleMap>
        </div>
    )
}

export default App;
