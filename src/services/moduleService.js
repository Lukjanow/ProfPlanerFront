import {ModuleModel} from "../models/moduleModel.js";
import api from "./api.js";
import {errorHandler} from "../utils/errorHandler.js";

function getAllModules() {
    return api
        .get(`/module`)
        .then(resObj => {
            errorHandler(resObj, "getAllModules");
            return {
                data: resObj.data.map(item => new ModuleModel(item)),
                status: resObj.status
            }
        })
}

// function getModuleById(id) {
//     return api.get(`/module/${id}`)
//         .then(resObj => new ModuleModel(resObj.data))
//         .catch(e => {
//             // throw new Error(e);
//             throw new Error(`Failed to fetch module with id: ${id}!`);
//         });
// }
//
// function addModule(id) {
//     return api.post(`/module`, new ModuleModel(
//         id
//     ))
//         .then(resObj => new ModuleModel(resObj))
//         .catch(e => {
//             // throw new Error(e);
//             throw new Error(`Failed to create a module!`);
//         });
// }

// TODO: other api requests

export {
    getAllModules,
    // getModuleById,
    // addModule
}
