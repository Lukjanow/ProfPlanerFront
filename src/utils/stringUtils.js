export function printArrAsString(array) {
    return array.join(", ");
}

export function printArrAsStringByKey(array, key) {
    return printArrAsString(array.map(array => array[key]));
}

export function printArrAsStringByKeys(array, keys) {
    return array.map(item => keys.map(key => item[key]).join(" ")).join(", ");
}

export function printValidFileName(string) {
    return String(string).toLowerCase().replaceAll(" ", "-");
}
