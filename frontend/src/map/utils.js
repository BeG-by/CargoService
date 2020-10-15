export function dateToString(date) {
    if (date === null) {
        return null;
    }
    let hoursStr = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minStr = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    return `${hoursStr}:${minStr} ${date.toISOString().slice(0, 10)} `
}

export function convertPointsToBackendApi(points) {
    let pointsWithCorrectApi = [];
    for (let point of points) {
        pointsWithCorrectApi.push({
            latitude: point.lat,
            longitude: point.lng,
        })
    }
    return pointsWithCorrectApi;
}

export function pointsComparator(p1, p2) {
    if (p1.index > p2.index) {
        return 1;
    }
    if (p1.index < p2.index) {
        return -1;
    }
    return 0;
}


export function convertPointsFromBackendApi(pointsFromBackend) {
    let pointsWithCorrectApi = [];
    for (let point of pointsFromBackend) {
        pointsWithCorrectApi.push({
            index: point.id,
            isPassed: point.passed,
            passageDate: point.passageDate === null ? null : new Date(point.passageDate),
            lat: parseFloat(point.latitude),
            lng: parseFloat(point.longitude),
        })
    }
    pointsWithCorrectApi.sort(pointsComparator);
    return pointsWithCorrectApi;
}

export function countDistanceBetweenMarkers(markers) {
    let distance = 0;
    for (let i = 0; i < markers.length - 1; i++) {
        distance += countDistanceBetweenTwoMarkers(markers[i], markers[i + 1]);
    }
    return distance;
}

export function countDistanceBetweenTwoMarkers(mk1, mk2) {
    let R = 6371009; // Radius of the Earth in meters
    let rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    let rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    let difflat = rlat2 - rlat1; // Radian difference (latitudes)
    let difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

    let d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}