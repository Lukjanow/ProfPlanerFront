import api from "./api.js";
import {StudySemesterModel} from "../models/studySemesterModel.js";

async function getAllStudySemesters() {
    return api
        .get(`/studysemester`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new StudySemesterModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getStudySemesterById(id) {
    return api
        .get(`/studysemester/${id}`)
        .then(resObj => {
            return {
                data: new StudySemesterModel().setJsonObj(resObj.data),
                status: resObj.status
            }
        });
}

async function addStudySemester(studySemesterModel) {
    return api
        .post(`/studysemester`, studySemesterModel)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function updateStudySemester(id, {
    name = null,
    study = null,
    content = null
}) {
    return api
        .put(`/studysemester/${id}`, {
            ...(name !== null && {name}),
            ...(study !== null && {study}),
            ...(content !== null && {content})
        })
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function deleteStudySemester(id) {
    return api
        .delete(`/studysemester/${id}`)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

export {
    getAllStudySemesters,
    getStudySemesterById,
    addStudySemester,
    updateStudySemester,
    deleteStudySemester
}
