import api from "./api.js";

async function runAlgo(data) {
    return api
        .post(`/algorithm`, data)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

export {
    runAlgo
}