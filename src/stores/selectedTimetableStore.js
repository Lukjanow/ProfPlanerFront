import {create} from "zustand";

export const useselectedTimetableStore = create(
    (set) => ({
        timeTableID: "",
        settimeTableID: (timeTableID) => {
            set(() => ({timeTableID: timeTableID}));
        },
    }),
    {
        name: "selectedTimetableStore"
    }
);