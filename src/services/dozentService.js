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

// TODO: which params are optional?
async function addDozent(dozentModel) {
    return api
        .post(`/dozent`, dozentModel)
        .then(resObj => {
            return {
                data: resObj.data, // TODO: paste in new DozentModel?
                status: resObj.status
            }
        });
}

// TODO: res => _id = null
async function updateDozent(id, {
        name = null,
        email = null,
        title = null,
        intern = null
    }) {
    return api
        .put(`/dozent/${id}`, {
            ...(name !== null && {name}),
            ...(email !== null && {e_mail: email}),
            ...(title !== null && {title}),
            ...(intern !== null && {intern})
        })
        .then(resObj => {
            return {
                data: resObj.data, // TODO: paste in new DozentModel?
                status: resObj.status
            }
        });
}

async function deleteDozent(id) {
    return api
        .delete(`/dozent/${id}`)
        .then(resObj => {
            return {
                data: resObj.data, // TODO: paste in new DozentModel?
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
