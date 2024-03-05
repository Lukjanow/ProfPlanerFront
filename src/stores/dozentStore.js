import {create} from "zustand";
import {
    addDozent, deleteDozent,
    getAllDozents,
    getDozentById,
    updateDozent
} from "../services/dozentService.js";

export const useDozentStore = create(
    (set, get) => ({
        dozentList: [],
        initDozentList: async () => {
           await get().refreshDozentList();
        },
        refreshDozentList: async () => {
            const oldDozentList = get().dozentList;
            const {data} = await getAllDozents();
            const updatedDozentList = data.map(newDozent => {
                const oldDozent = oldDozentList.find(d => d.id === newDozent.id);
                return newDozent ? newDozent : oldDozent;
            });
            set(() => ({dozentList: updatedDozentList}));
        },
        getDozentById: async (id) => {
            const {data} = await getDozentById(id);
            return data;
        },
        addDozent: async (dozentModel) => {
            const {data} = await addDozent(dozentModel);
            await get().refreshDozentList();
            return data;
        },
        updateDozent: async (id, {name, email, title, intern}) => {
            const {data} = await updateDozent(id, {name, email, title, intern});
            await get().refreshDozentList();
            return data;
        },
        deleteDozent: async (id) => {
            const {data} = await deleteDozent(id);
            await get().refreshDozentList();
            return data;
        },
    }),
    {
        name: "dozentStore"
    }
);
