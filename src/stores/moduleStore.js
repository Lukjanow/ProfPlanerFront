import { create } from "zustand";
import {
    addModule,
    deleteModule,
    getAllModules,
    getAllBasicDataModules,
    getAllModulesByDozentId,
    getAllModulesByStudySemesterId, getModuleById,
    getModulesByModuleId,
    getSelectedModules, getUnselectedModules,
    updateModule
} from "../services/moduleService.js";

export const useModuleStore = create(
    (set, get) => ({
        moduleList: [],
        initModuleList: async () => {
            await get().refreshModuleList();
        },
        refreshModuleList: async () => {
            const oldModuleList = get().moduleList;
            const { data } = await getAllModules();
            const updatedModuleList = data.map(newModule => {
                const oldModule = oldModuleList.find(m => m.id === newModule.id);
                return newModule ? newModule : oldModule;
            });
            set(() => ({ moduleList: updatedModuleList }));
        },
        getAllBasicDataModules: async () => {
            const { data } = await getAllBasicDataModules();
            return data;
        },
        getModulesByModuleId: async (moduleId) => {
            const { data } = await getModulesByModuleId(moduleId);
            return data;
        },
        getModuleById: async (id) => {
            const { data } = await getModuleById(id);
            return data;
        },
        getSelectedModules: async () => {
            const { data } = await getSelectedModules();
            return data;
        },
        getUnselectedModules: async () => {
            const { data } = await getUnselectedModules();
            return data;
        },
        getAllModulesByDozentId: async (dozentId) => {
            const { data } = await getAllModulesByDozentId(dozentId);
            return data;
        },
        getAllModulesByStudySemesterId: async (studySemesterId) => {
            const { data } = await getAllModulesByStudySemesterId(studySemesterId);
            return data;
        },
        addModule: async (moduleModel) => {
            const { data } = await addModule(moduleModel);
            await get().refreshModuleList();
            return data;
        },
        updateModule: async (id, { moduleId, name, code, dozentIdList, roomIdList, studySemesterIdList, duration, approximateAttendance, need, typeList,
            frequency, selected, color, note, groups }) => {
            const { data } = await updateModule(id, {
                moduleId, name, code, dozentIdList, roomIdList, studySemesterIdList, duration, approximateAttendance, need, typeList,
                frequency, selected, color, note, groups
            });
            await get().refreshModuleList();
            return data;
        },
        deleteModule: async (id) => {
            const { data } = await deleteModule(id);
            await get().refreshModuleList();
            return data;
        },
    }),
    {
        name: "moduleStore"
    }
);
