import {ModuleBasicModel, ModuleModel} from "../models/moduleModel.js";
import api from "./api.js";

async function getAllModules() {
    return api
        .get(`/moduledata`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new ModuleModel(item)),
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

async function getModuleById(id) {
    return api
        .get(`/moduledata/${id}`)
        .then(resObj => {
            return {
                data: new ModuleModel(resObj.data),
                status: resObj.status
            }
        });
}

async function getSelectedModules() {
    return api
        .get(`/modulesdata/select`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new ModuleModel(item)),
                status: resObj.status
            }
        });
}

async function getAllModulesByDozentId(dozentId) {
    return api
        .get(`/moduledata/dozent/${dozentId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new ModuleModel(item)),
                status: resObj.status
            }
        });
}

async function getAllModulesByStudySemesterId(studySemesterId) {
    return api
        .get(`/moduledata/studysemester/${studySemesterId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new ModuleModel(item)),
                status: resObj.status
            }
        });
}

// TODO: which params are optional?
async function addModule(id, name, code, dozentIdList, room, studySemesterIdList, duration, approximateAttendance, need, type,
                         frequency, selected, color, note, groups) {
    return api
        .post(`/module`, {
            id,
            name,
            code,
            dozent: dozentIdList,
            room,
            study_semester: studySemesterIdList,
            duration,
            approximate_attendance: approximateAttendance,
            need,
            type,
            frequency,
            selected,
            color,
            note,
            groups
        })
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function updateModule(id, {
    name = null,
    code = null,
    dozentIdList = null,
    room = null,
    studySemesterIdList = null,
    duration = null,
    approximateAttendance = null,
    need = null,
    type = null,
    frequency = null,
    selected = null,
    color = null,
    note = null,
    groups = null
}) {
    return api
        .put(`/module/${id}`, {
            ...(name !== null && {name}),
            ...(code !== null && {code}),
            ...(dozentIdList !== null && {dozent: dozentIdList}),
            ...(room !== null && {room}),
            ...(studySemesterIdList !== null && {study_semester: studySemesterIdList}),
            ...(selected !== null && {selected}),
            ...(duration !== null && {duration}),
            ...(approximateAttendance !== null && {approximate_attendance: approximateAttendance}),
            ...(need !== null && {need}),
            ...(type !== null && {type}),
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
        })
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
    getModuleById,
    getSelectedModules,
    getAllModulesByDozentId,
    getAllModulesByStudySemesterId,
    addModule,
    updateModule,
    deleteModule
}
