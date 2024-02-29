import {RoomModel} from "../models/roomModel.js";
import api from "./api.js";

async function getAllRooms() {
    return api
        .get(`/room`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new RoomModel(item)),
                status: resObj.status
            }
        });
}

async function getRoomById(id) {
    return api
        .get(`/room/${id}`)
        .then(resObj => {
            return {
                data: new RoomModel(resObj.data),
                status: resObj.status
            }
        });
}

// TODO: which params are optional?
async function addRoom(name, capacity, equipment) {
    return api
        .post(`/room/add`, {
            name,
            capacity,
            equipment
        })
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

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
                data: resObj.data,
                status: resObj.status
            }
        })
}

async function deleteRoom(id) {
    return api
        .delete(`/room/${id}`)
        .then(resObj => {
            return {
                data: resObj.data,
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
