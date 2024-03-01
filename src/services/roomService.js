import {RoomModel} from "../models/roomModel.js";
import api from "./api.js";

async function getAllRooms() {
    return api
        .get(`/room`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new RoomModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getRoomById(id) {
    return api
        .get(`/room/${id}`)
        .then(resObj => {
            return {
                data: new RoomModel().setJsonObj(resObj.data),
                status: resObj.status
            }
        });
}

// TODO: which params are optional?
async function addRoom(roomModel) {
    return api
        .post(`/room/add`, roomModel)
        .then(resObj => {
            return {
                data: resObj.data, // TODO: paste in new RoomModel?
                status: resObj.status
            }
        });
}

// TODO: res => _id = null
async function updateRoom(id, {
    name = null,
    capacity = null,
    equipment = null
}) {
    return api
        .put(`/room/${id}`, {
            ...(name !== null && {name}),
            ...(capacity !== null && {capacity}),
            ...(equipment !== null && {equipment})
        })
        .then(resObj => {
            return {
                data: resObj.data, // TODO: paste in new RoomModel?
                status: resObj.status
            }
        });
}

async function deleteRoom(id) {
    return api
        .delete(`/room/${id}`)
        .then(resObj => {
            return {
                data: resObj.data, // TODO: paste in new RoomModel?
                status: resObj.status
            }
        });
}

export {
    getAllRooms,
    getRoomById,
    addRoom,
    updateRoom,
    deleteRoom
}
