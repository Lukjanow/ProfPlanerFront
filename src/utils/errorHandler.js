function errorHandler(resObj, apiReqName = "[UNKNOWN]") {
    if (resObj.status >= 400) {
        throw new Error(`${apiReqName}: Request failed with status ${resObj.status}!`);
    }
}

export {
    errorHandler
}
