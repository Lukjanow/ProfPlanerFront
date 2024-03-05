import {create} from "zustand";
import {
    addCalendar, addCalendarEntryForCalendar,
    deleteCalendar, deleteCalendarEntry,
    getAllCalendars,
    getCalendarById,
    getCalendarEntriesForDozentAndCalendar,
    getCalendarEntriesForRoomAndCalendar,
    getCalendarEntriesForStudySemesterAndCalendar, getCalendarEntry,
    updateCalendar, updateCalendarEntry
} from "../services/calendarService.js";

export const useCalendarStore = create(
    (set, get) => ({
        calendarList: [],
        initCalendarList: async () => {
           await get().refreshCalendarList();
        },
        refreshCalendarList: async () => {
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
            await get().refreshCalendarList();
            return data;
        },
        updateCalendar: async (id, {name, entryIdList}) => {
            const {data} = await updateCalendar(id, {name, entryIdList});
            await get().refreshCalendarList();
            return data;
        },
        deleteCalendar: async (id) => {
            const {data} = await deleteCalendar(id);
            await get().refreshCalendarList();
            return data;
        },
        getCalendarEntry: async (id) => {
            const {data} = await getCalendarEntry(id);
            return data;
        },
        getCalendarEntriesForStudySemesterAndCalendar: async (calendarId, studySemesterId) => {
            const {data} = await getCalendarEntriesForStudySemesterAndCalendar(calendarId, studySemesterId);
            return data;
        },
        getCalendarEntriesForDozentAndCalendar: async (calendarId, dozentId) => {
            const {data} = await getCalendarEntriesForDozentAndCalendar(calendarId, dozentId);
            return data;
        },
        getCalendarEntriesForRoomAndCalendar: async (calendarId, roomId) => {
            const {data} = await getCalendarEntriesForRoomAndCalendar(calendarId, roomId);
            return data;
        },
        addCalendarEntryForCalendar: async (calendarId, calendarEntryModel) => {
            const {data} = await addCalendarEntryForCalendar(calendarId, calendarEntryModel);
            await get().refreshCalendarList();
            return data;
        },
        updateCalendarEntry: async (id, {moduleId, timeStampModel, comment}) => {
            const {data} = await updateCalendarEntry(id, {moduleId, timeStampModel, comment});
            await get().refreshCalendarList();
            return data;
        },
        deleteCalendarEntry: async (id) => {
            const {data} = await deleteCalendarEntry(id);
            await get().refreshCalendarList();
            return data;
        }
    }),
    {
        name: "calendarStore"
    }
);
