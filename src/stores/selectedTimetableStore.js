import {create} from "zustand";

export const useselectedTimetableStore = create(
    (set) => ({
        timeTableID: "",
        
        settimeTableID: (id) => {
            set(() => ({id: id}));
        },
    }),
    {
        name: "selectedTimetableStore"
    }
);