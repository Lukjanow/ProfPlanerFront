import {DozentModel} from "../models/dozentModel.js";
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

async function updateDozent(id, {
        prename = null,
        lastname = null,
        email = null,
        title = null,
        salutation = null
    }) {
    return api
        .put(`/dozent/${id}`, {
            ...(prename !== null && {prename}),
            ...(lastname !== null && {lastname}),
            ...(email !== null && {e_mail: email}),
            ...(title !== null && {title}),
            ...(salutation !== null && {salutation}),
        })
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
