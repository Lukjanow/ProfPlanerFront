import {create} from "zustand";
import {
    addModule,
    deleteModule,
    getAllModules,
    getAllModulesByDozentId,
    getAllModulesByStudySemesterId,
    getModuleById,
    getSelectedModules,
    updateModule
} from "../services/moduleService.js";

export const useModuleStore = create(
    (set, get) => ({
        moduleList: [],
        initModuleList: async () => {
            const oldModuleList = get().moduleList;
            const {data} = await getAllModules();
            const updatedModuleList = data.map(newModule => {
                const oldModule = oldModuleList.find(m => m.id === newModule.id);
                return newModule ? newModule : oldModule;
            });
            set(() => ({moduleList: updatedModuleList}));
        },
        getModuleById: async (id) => {
            const {data} = await getModuleById(id);
            return data;
        },
        getSelectedModules: async () => {
            const {data} = await getSelectedModules();
            return data;
        },
        getAllModulesByDozentId: async (dozentId) => {
            const {data} = await getAllModulesByDozentId(dozentId);
            return data;
        },
        getAllModulesByStudySemesterId: async (studySemesterId) => {
            const {data} = await getAllModulesByStudySemesterId(studySemesterId);
            return data;
        },
        addModule: async (id, name, dozentIdList, room, studySemesterIdList, duration, approximateAttendance, need, type, frequency, selected) => {
            const {data} = await addModule(id, name, dozentIdList, room, studySemesterIdList, duration, approximateAttendance,
                need, type, frequency, selected);
            return data;
        },
        updateModule: async (id, {name, dozentIdList, room, studySemesterIdList, duration, approximateAttendance, need, type, frequency, selected}) => {
            const {data} = await updateModule(id, {name, dozentIdList, room, studySemesterIdList, duration, approximateAttendance, need, type, frequency, selected});
            return data;
        },
        deleteModule: async (id) => {
            const {data} = await deleteModule(id);
            return data;
        },
    }),
    {
        name: "moduleStore"
    }
);
