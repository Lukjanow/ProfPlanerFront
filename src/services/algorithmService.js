import api from "./api.js";

async function runAlgo() {
    return api
        .post(`/algorithm`)
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