import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, Dimensions} from "react-native";
import {connect} from "react-redux";
import MapView, {Polyline} from "react-native-maps";
import {setSelectedLog} from "react-native/Libraries/LogBox/Data/LogBoxData";
import {pointsComparator} from "../../../map/utils";
import {GoogleMap} from "@react-google-maps/api";

const mapStateToProps = (store) => {
    return {
        user: store.user,
        company: store.company,
        jwtToken: store.jwtToken,
    }
};


export const Map = connect(mapStateToProps)(props => {
    const [waybill, setWaybill] = useState(null);
    const [markers, setMarkers] = useState(null);

    const requestForCurrentWaybill = async () => {
        const url = "http://192.168.100.18/v1/api/waybills/current";

        const method = "GET";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': props.jwtToken
        };

        let response = await fetch(url, {method, headers})
        return await response.json();
    }

    const updateControlPoints = (waybill) => {
        waybill.points.sort(pointsComparator)
        let points = waybill.points.map(point =>
            <MapView.Marker
                coordinate={{
                    latitude: parseFloat(point.latitude),
                    longitude: parseFloat(point.longitude)
                }}
                key={point.longitude + "_" + point.latitude}
            />)
        setMarkers(points);
    }

    useEffect(() => {
        requestForCurrentWaybill()
            .then(response => {
                if (response.status !== 404) {
                    setWaybill(response);
                    updateControlPoints(response);
                }
            });
    }, [props.jwtToken])


    return (
        <View style={styles.mapContainer}>
            <MapView style={styles.map}>
                {markers}
                {waybill === null ? null :
                    <Polyline
                        coordinates={waybill.points.map(point => {
                            return {
                                latitude: parseFloat(point.latitude),
                                longitude: parseFloat(point.longitude)
                            }
                        })}
                        strokeColor="#000"
                        strokeWidth={2}
                    />}
            </MapView>
        </View>
    );
});

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: '100%',
    }
})
