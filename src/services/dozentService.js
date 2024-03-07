import { DozentModel } from "../models/dozentModel.js";
import api from "./api.js";

async function getAllDozents() {
    return api
        .get(`/dozent`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new DozentModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getDozentById(id) {
    return api
        .get(`/dozent/${id}`)
        .then(resObj => {
            return {
                data: new DozentModel().setJsonObj(resObj.data),
                status: resObj.status
            }
        });
}

async function addDozent(dozentModel) {
    return api
        .post(`/dozent`, dozentModel)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function updateDozent(id, dozentModel) {
    return api
        .put(`/dozent/${id}`, dozentModel)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function deleteDozent(id) {
    return api
        .delete(`/dozent/${id}`)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

export {
    getAllDozents,
    getDozentById,
    addDozent,
    updateDozent,
    deleteDozent
}
