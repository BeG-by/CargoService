import React, {useCallback, useRef, useState} from "react";
import {GoogleMap, Marker, useLoadScript, Polyline} from "@react-google-maps/api";
import MarkersList from "./points-list";

const MAP_CONTAINER_STYLE = {width: 750, height: 500}
const MAP_OPTIONS = {disableDefaultUI: true};
const START_CENTER = {lat: 43.6, lng: -79};
const START_ZOOM = 8;
const PASSED_MARKER_ICON = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
const NOT_PASSED_MARKER_ICON = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
const POLYLINE_COLOR = "#00ffff";
const POLYLINE_OPACITY = 5;

export default function AbstractMap(props) {
    const markers = props.markers;
    const infoWindowComponent = props.infoWindowComponent;
    const onMapClick = props.onMapClick;
    const onMarkerClick = props.onMarkerClick;

    const [center, setCenter] = useState(START_CENTER)
    const mapRef = useRef();

    const {isLoaded, loadError} = useLoadScript({
        // googleMapsApiKey: "API",
    });

    const handleMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const handleMapClick = (event) => {
        onMapClick(event);
    };


    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps...";

    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <GoogleMap
                mapContainerStyle={MAP_CONTAINER_STYLE}
                zoom={START_ZOOM}
                center={center}
                options={MAP_OPTIONS}
                onClick={handleMapClick}
                onLoad={handleMapLoad}
            >
                {markers.map(marker => {
                    return <Marker
                        key={`${marker.lng}_${marker.lat}`}
                        position={{lat: marker.lat, lng: marker.lng}}
                        onClick={() => onMarkerClick(marker)}
                        icon={marker.isPassed ? PASSED_MARKER_ICON : NOT_PASSED_MARKER_ICON}
                    />
                })}

                <Polyline
                    geodesic={true}
                    options={{
                        path: markers,
                        strokeColor: POLYLINE_COLOR,
                        strokeOpacity: POLYLINE_OPACITY,
                        strokeWeight: 2,
                        icons: [{offset: "0", repeat: "10px"},],
                    }}
                />
                {infoWindowComponent}
            </GoogleMap>
            <MarkersList
                items={markers}
                listName={"Markers"}
                onRowClick={(item) => setCenter(item)}
            />
        </div>
    )
}

