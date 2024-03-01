import {create} from "zustand";
import {
    addModule,
    deleteModule,
    getAllModules,
    getAllModulesByDozentId,
    getAllModulesByStudySemesterId,
    getModulesById,
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
        getModulesById: async (id) => {
            const {data} = await getModulesById(id);
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
        addModule: async (moduleModel) => {
            const {data} = await addModule(moduleModel);
            return data;
        },
        updateModule: async (id, type, {name, code, dozentIdList, room, studySemesterIdList, duration, approximateAttendance, need,
            frequency, selected, color, note, groups}) => {
            const {data} = await updateModule(id, type, {name, code, dozentIdList, room, studySemesterIdList, duration, approximateAttendance, need,
                frequency, selected, color, note, groups});
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
