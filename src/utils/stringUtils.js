export function printMapAsString(stringMap) {
    return stringMap.join(", ");
}

export function printMapAsStringByKey(stringMap, key) {
    return printMapAsString(stringMap.map(item => item[key]));
}

export function printMapAsStringByKeys(stringMap, keys) {
    return stringMap.map(item => keys.map(key => item[key]).join(" ")).join(", ");
}

export function printMapAsStringByNestedKeys(stringMap, nestedKeys) {
    let value = stringMap;
    for (const key of nestedKeys) {
        value = value[key];
        if (!value) {
            return "-";
        }
    }
    return String(value);
}

export function printArrWithSpecificAction(array, doActionInEachArrItem) {
    let mapResult = [];
    array.forEach(item => {
        mapResult.push(doActionInEachArrItem(item));
    });
    return printMapAsString(mapResult);
}

export function printValidFileName(string) {
    return String(string).toLowerCase().replaceAll(" ", "-");
}
