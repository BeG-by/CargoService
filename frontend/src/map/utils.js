export function dateToString(date) {
    return `${date.toISOString().slice(0, 10)} ${date.getHours()}:${date.getMinutes()}`;
}