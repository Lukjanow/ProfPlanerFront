import { RoomModel } from "../models/roomModel.js";
import api from "./api.js";

async function getAllRooms() {
  return api.get(`/room`).then((resObj) => {
    return {
      data: resObj.data,
      // data: resObj.data.map((item) => new RoomModel().setJsonObj(item)),
      status: resObj.status,
    };
  });
}

async function getAllTrueRooms() {
  return api.get(`/room`).then((resObj) => {
    return {
      data: resObj.data,
      status: resObj.status,
    };
  });
}

async function getRoomById(id) {
  return api.get(`/room/${id}`).then((resObj) => {
    return {
      data: new RoomModel().setJsonObj(resObj.data),
      status: resObj.status,
    };
  });
}

async function addRoom(roomModel) {
  console.log("------------------> Room: ", roomModel);
  return api.post(`/room/add`, roomModel).then((resObj) => {
    return {
      data: resObj.data,
      status: resObj.status,
    };
  });
}

async function updateRoom(
  id,
  { roomNumber = null, capacity = null, roomType = null }
) {
  return api
    .put(`/room/${id}`, {
      ...(roomNumber !== null && { roomNumber }),
      ...(capacity !== null && { capacity }),
      ...(roomType !== null && { roomType }),
    })
    .then((resObj) => {
      return {
        data: resObj.data,
        status: resObj.status,
      };
    });
}

async function deleteRoom(id) {
  return api.delete(`/room/${id}`).then((resObj) => {
    return {
      data: resObj.data,
      status: resObj.status,
    };
  });
}

export { getAllRooms, getAllTrueRooms, getRoomById, addRoom, updateRoom, deleteRoom };
