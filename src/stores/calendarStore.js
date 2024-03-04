import {create} from "zustand";
import {
    addCalendar, addCalendarEntryForCalendar,
    deleteCalendar, deleteCalendarEntryForCalendar,
    getAllCalendars,
    getCalendarById,
    getCalendarEntriesForDozent,
    getCalendarEntriesForRoom,
    getCalendarEntriesForStudySemester,
    getCalendarEntryForCalendar,
    updateCalendar, updateCalendarEntryForCalendar
} from "../services/calendarService.js";

export const useCalendarStore = create(
    (set, get) => ({
        calendarList: [],
        initCalendarList: async () => {
            const oldCalendarList = get().calendarList;
            const {data} = await getAllCalendars();
            const updatedCalendarList = data.map(newCalendar => {
                const oldCalendar = oldCalendarList.find(c => c.id === newCalendar.id);
                return newCalendar ? newCalendar : oldCalendar;
            });
            set(() => ({calendarList: updatedCalendarList}));
        },
        getCalendarById: async (id) => {
            const {data} = await getCalendarById(id);
            return data;
        },
        addCalendar: async (calendarModel) => {
            const {data} = await addCalendar(calendarModel);
            return data;
        },
        updateCalendar: async (id, {name, entryIdList}) => {
            const {data} = await updateCalendar(id, {name, entryIdList});
            return data;
        },
        deleteCalendar: async (id) => {
            const {data} = await deleteCalendar(id);
            return data;
        },
        getCalendarEntryForCalendar: async (calendarId, calendarEntryId) => {
            const {data} = await getCalendarEntryForCalendar(calendarId, calendarEntryId);
            return data;
        },
        getCalendarEntriesForStudySemester: async (calendarId, studySemesterId) => {
            const {data} = await getCalendarEntriesForStudySemester(calendarId, studySemesterId);
            return data;
        },
        getCalendarEntriesForDozent: async (calendarId, dozentId) => {
            const {data} = await getCalendarEntriesForDozent(calendarId, dozentId);
            return data;
        },
        getCalendarEntriesForRoom: async (calendarId, roomId) => {
            const {data} = await getCalendarEntriesForRoom(calendarId, roomId);
            return data;
        },
        addCalendarEntryForCalendar: async (calendarEntryModel) => {
            const {data} = await addCalendarEntryForCalendar(calendarEntryModel);
            return data;
        },
        updateCalendarEntryForCalendar: async (calendarId, calendarEntryId, {name, entryIdList}) => {
            const {data} = await updateCalendarEntryForCalendar(calendarId, calendarEntryId, {name, entryIdList});
            return data;
        },
        deleteCalendarEntryForCalendar: async (calendarId, calendarEntryId) => {
            const {data} = await deleteCalendarEntryForCalendar(calendarId, calendarEntryId);
            return data;
        }
    }),
    {
        name: "calendarStore"
    }
);
