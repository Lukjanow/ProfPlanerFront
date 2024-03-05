import {ModuleBasicModel, ModuleModel} from "../models/moduleModel.js";
import api from "./api.js";

// TODO: missing routes: getModuleById, getUnselectedModules
async function getAllModules() {
    return api
        .get(`/moduledata`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new ModuleModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getAllBasicDataModules() {
    return api
        .get(`/module/basicdata`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new ModuleBasicModel(item)),
                status: resObj.status
            }
        });
}

async function getModulesByModuleId(moduleId) {
    return api
        .get(`/moduledata/${moduleId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new ModuleModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getSelectedModules() {
    return api
        .get(`/modulesdata/select`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new ModuleModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getAllModulesByDozentId(dozentId) {
    return api
        .get(`/moduledata/dozent/${dozentId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new ModuleModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getAllModulesByStudySemesterId(studySemesterId) {
    return api
        .get(`/moduledata/studysemester/${studySemesterId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new ModuleModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function addModule(moduleModel) {
    return api
        .post(`/module`, moduleModel)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function updateModule(id, {
    moduleId = null,
    name = null,
    code = null,
    dozentIdList = null,
    room = null,
    studySemesterIdList = null,
    duration = null,
    approximateAttendance = null,
    need = null,
    typeList = null,
    frequency = null,
    selected = null,
    color = null,
    note = null,
    groups = null
}) {
    return api
        .put(`/module/${id}`, {
            ...(moduleId !== null && {moduleId}),
            ...(name !== null && {name}),
            ...(code !== null && {code}),
            ...(dozentIdList !== null && {dozent: dozentIdList}),
            ...(room !== null && {room}),
            ...(studySemesterIdList !== null && {study_semester: studySemesterIdList}),
            ...(selected !== null && {selected}),
            ...(duration !== null && {duration}),
            ...(approximateAttendance !== null && {approximate_attendance: approximateAttendance}),
            ...(need !== null && {need}),
            ...(typeList !== null && {type: typeList}),
            ...(frequency !== null && {frequency}),
            ...(color !== null && {color}),
            ...(note !== null && {note}),
            ...(groups !== null && {groups})
        })
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function deleteModule(id) {
    return api
        .delete(`/module/${id}`)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

export {
    getAllModules,
    getAllBasicDataModules,
    getModulesByModuleId,
    getSelectedModules,
    getAllModulesByDozentId,
    getAllModulesByStudySemesterId,
    addModule,
    updateModule,
    deleteModule
}
