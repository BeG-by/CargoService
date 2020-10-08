export function dateToString(date) {
    if (date === null) {
        return null;
    }
    return `${date.toISOString().slice(0, 10)}`; //${date.getHours()}:${date.getMinutes()}
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