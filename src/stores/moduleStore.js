import {create} from "zustand";
import {getAllModules} from "../services/moduleService.js";

export const useModuleStore = create(
    (set, get) => ({
        moduleList: [],
        setModuleList: async () => {
            const oldModuleList = get().moduleList;
            const {data} = await getAllModules();
            const updatedModuleList = data.map(newModule => {
                const oldModule = oldModuleList.find(m => m.id === newModule.id);
                return newModule ? newModule : oldModule;
            });
            set(() => ({moduleList: updatedModuleList}));
        }
    }),
    {
        name: "moduleStore"
    }
);
