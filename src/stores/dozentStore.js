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
        addDozent: async (name, email, title, intern) => {
            const {data} = await addDozent(name, email, title, intern);
            return data;
        },
        updateDozent: async (id, {name, email, title, intern}) => {
            const {data} = await updateDozent(id, {name, email, title, intern});
            return data;
        },
        deleteDozent: async (id) => {
            const {data} = await deleteDozent(id);
            return data;
        },
    }),
    {
        name: "dozentStore"
    }
);
