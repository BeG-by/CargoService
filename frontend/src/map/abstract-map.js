import React, {useCallback, useRef, useState} from "react";
import {GoogleMap, Marker, Polyline, useLoadScript} from "@react-google-maps/api";
import MarkersList from "./markers-list.js";
import {GOOGLE_MAP_API_KEY} from "../keys.json";
import Search from "./search";
import Locate from "./locate";

export const API_KEY = GOOGLE_MAP_API_KEY;
const MAP_CONTAINER_STYLE = {width: 750, height: 500}
const MAP_OPTIONS = {disableDefaultUI: true,};
const START_CENTER = {lat: 43.6, lng: -79};
const START_ZOOM = 8;
const ZOOM_FOR_PLACE = 15;
const PASSED_MARKER_ICON = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
const NOT_PASSED_MARKER_ICON = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
const POLYLINE_COLOR = "#00ffff";
const POLYLINE_OPACITY = 5;
const LIBRARIES = ["places"];

export default function AbstractMap(props) {
    const markers = props.markers;
    const infoWindowComponent = props.infoWindowComponent;
    const onMapClick = props.onMapClick;
    const onMarkerClick = props.onMarkerClick;

    const [center, setCenter] = useState(START_CENTER)

    const mapRef = useRef();
    const handleMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries: LIBRARIES,
    });

    const handleMapClick = (event) => {
        onMapClick(event);
    };

    const handlePlaceSelect = (lat, lng) => {
        mapRef.current.panTo({lat, lng})
        mapRef.current.setZoom(ZOOM_FOR_PLACE)
    }

    const handleLocateClick = (lat, lng) => {
        mapRef.current.panTo({lat, lng})
        mapRef.current.setZoom(ZOOM_FOR_PLACE)
    }

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps...";

    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <Search center={center} onSelect={handlePlaceSelect}/>
            <Locate onClick={handleLocateClick}/>
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
                listName={"Points"}
                onRowClick={(pointIndex) => {
                    markers
                        .filter(marker => marker.index === pointIndex)
                        .map(marker => setCenter(marker))
                }}/>
        </div>)
}

