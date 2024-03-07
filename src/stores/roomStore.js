import {create} from "zustand";
import {addRoom, deleteRoom, getAllRooms, getRoomById, updateRoom} from "../services/roomService.js";

export const useRoomStore = create(
    (set, get) => ({
        roomList: [],
        initRoomList: async () => {
           await get().refreshRoomList();
        },
        refreshRoomList: async() => {
            const oldRoomList = get().roomList;
            const {data} = await getAllRooms();
            const updatedRoomList = data.map(newRoom => {
                const oldRoom = oldRoomList.find(r => r.id === newRoom.id);
                return newRoom ? newRoom : oldRoom;
            });
            set(() => ({roomList: updatedRoomList}));
        },
        getRoomById: async (id) => {
            const {data} = await getRoomById(id);
            return data;
        },
        addRoom: async (roomModel) => {
            const {data} = await addRoom(roomModel);
            await get().refreshRoomList();
            return data;
        },
        updateRoom: async (id, {name, capacity, equipment}) => {
            const {data} = await updateRoom(id, {name, capacity, equipment});
            await get().refreshRoomList();
            return data;
        },
        deleteRoom: async (id) => {
            const {data} = await deleteRoom(id);
            await get().refreshRoomList();
            return data;
        },
    }),
    {
        name: "roomStore"
    }
);
