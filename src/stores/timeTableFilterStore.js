import {create} from "zustand";

export const useTimeTableFilterStore = create(
    (set) => ({
        filteredType: "",
        filteredValue: "",
        currentCalendar: null,
        setFilteredType: (filteredType) => {
            set(() => ({filteredType: filteredType}));
        },
        setFilteredValue: (filteredValue) => {
            set(() => ({filteredValue: filteredValue}));
        },
        setCurrentCalendar: (currentCalendar) => {
            set(() => ({currentCalendar: currentCalendar}));
        }
    }),
    {
        name: "timeTableFilterStore"
    }
);