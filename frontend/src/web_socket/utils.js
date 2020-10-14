export function dateToString(date) {
    if (date === null) {
        return null;
    }
    return `${date.toISOString().slice(0, 10)} ${date.getHours()}:${date.getMinutes()}`
}

export function formatDateStr(str) {
    return `${str.slice(11, 16)} ${str.slice(0, 10)}`

}