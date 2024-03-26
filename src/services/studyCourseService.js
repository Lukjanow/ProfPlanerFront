import api from "./api.js";
import {StudyCourseModel} from "../models/studyCourseModel.js";

async function getAllStudyCourses() {
    return api
        .get(`/studycourse`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new StudyCourseModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getStudyCourseById(id) {
    return api
        .get(`/studycourse/${id}`)
        .then(resObj => {
            return {
                data: new StudyCourseModel().setJsonObj(resObj.data),
                status: resObj.status
            }
        });
}

async function addStudyCourse(studycourseModel) {
    return api
        .post(`/studycourse`, studycourseModel)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function updateStudyCourse(id, {
    name = null,
    semesterCount = null,
    content = null
}) {
    return api
        .put(`/studycourse/${id}`, {
            ...(name !== null && {name}),
            ...(semesterCount !== null && {semesterCount}),
            ...(content !== null && {content})
        })
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function deleteStudyCourse(id) {
    return api
        .delete(`/studycourse/${id}`)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

export {
    getAllStudyCourses,
    getStudyCourseById,
    addStudyCourse,
    updateStudyCourse,
    deleteStudyCourse
}
