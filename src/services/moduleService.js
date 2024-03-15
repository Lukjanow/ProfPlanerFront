import {ModuleBasicModel, ModuleModel} from "../models/moduleModel.js";
import api from "./api.js";

async function getAllModules() {
    return api
        .get(`/moduledata`)
        .then(resObj => {
            return {
                data: resObj.data,
                // data: resObj.data.map(item => new ModuleModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getAllBasicDataModules() {
    return api
        .get(`/module/basicdata/`)
        .then(resObj => {

            console.log("resObj:", resObj.data.map(item => new ModuleBasicModel(item)));

            return {
                data: resObj.data.map(item => new ModuleBasicModel(item)),
                status: resObj.status
            }
        });
}

async function getModulesByModuleId(moduleId) {
    return api
        .get(`/moduledata/module/${moduleId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new ModuleModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getModuleById(id) {
    return api
        .get(`/moduledata/${id}`)
        .then(resObj => {
            return {
                data: new ModuleModel().setJsonObj(resObj.data),
                status: resObj.status
            }
        });
}

async function getModuleByIdwithoutData(id) {
    return api
        .get(`/module/${id}`)
        .then(resObj => {
            return {
                data: new ModuleModel().setJsonObj(resObj.data),
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

async function getUnselectedModules() {
    return api
        .get(`/modulesdata/unselect`)
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

async function updateModule(id, moduleModel) {
    return api
        .put(`/module/${id}`, moduleModel)
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
    getModuleById,
    getSelectedModules,
    getUnselectedModules,
    getAllModulesByDozentId,
    getAllModulesByStudySemesterId,
    addModule,
    updateModule,
    deleteModule,
    getModuleByIdwithoutData
}
