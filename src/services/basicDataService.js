import api from "./api.js";
import {CalendarModel} from "../models/calendarModel.js";
import {CalendarEntryModel} from "../models/calendarEntryModel.js";

async function getAllCalendars() {
    return api
        .get(`/calendar`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new CalendarModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getCalendarById(id) {
    return api
        .get(`/calendar/${id}`)
        .then(resObj => {
            return {
                data: new CalendarModel().setJsonObj(resObj.data),
                status: resObj.status
            }
        });
}

async function addCalendar(calendarModel) {
    return api
        .post(`/calendar`, calendarModel)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function updateCalendar(id, {
        name = null,
        entryIdList = null,
    }) {
    return api
        .put(`/calendar/${id}`, {
            ...(name !== null && {name}),
            ...(entryIdList !== null && {entries: entryIdList})
        })
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function deleteCalendar(id) {
    return api
        .delete(`/calendar/${id}`)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function getCalendarEntry(id) {
    return api
        .get(`/calendar/calendarentry/${id}`)
        .then(resObj => {
            return {
                data: new CalendarEntryModel().setJsonObj(resObj.data),
                status: resObj.status
            }
        });
}

async function getCalendarEntriesForCalendar(calendarId) {
    return api
        .get(`/calendar/entrys/${calendarId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new CalendarEntryModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getCalendarEntriesForStudySemesterAndCalendar(calendarId, studySemesterId) {
    return api
        .get(`/calendar/studysemester/${calendarId}/${studySemesterId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new CalendarEntryModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getCalendarEntriesForDozentAndCalendar(calendarId, dozentId) {
    return api
        .get(`/calendar/dozent/${calendarId}/${dozentId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new CalendarEntryModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function getCalendarEntriesForRoomAndCalendar(calendarId, roomId) {
    return api
        .get(`/calendar/room/${calendarId}/${roomId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new CalendarEntryModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

async function addCalendarEntryForCalendar(calendarId, calendarEntryModel) {
    return api
        .post(`/calendar/calendarentry/${calendarId}`, calendarEntryModel)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function updateCalendarEntry(id, {
    moduleId = null,
    timeStampModel = null,
    comment = null,
}) {
    return api
        .put(`/calendar/calendarentry/${id}`, {
            ...(moduleId !== null && {module: moduleId}),
            ...(timeStampModel !== null && {time_stamp: timeStampModel}),
            ...(comment !== null && {comment})
        })
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

async function deleteCalendarEntry(id) {
    return api
        .delete(`/calendar/calendarentry/${id}`)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

export {
    getAllCalendars,
    getCalendarById,
    addCalendar,
    updateCalendar,
    deleteCalendar,
    getCalendarEntry,
    getCalendarEntriesForCalendar,
    getCalendarEntriesForStudySemesterAndCalendar,
    getCalendarEntriesForDozentAndCalendar,
    getCalendarEntriesForRoomAndCalendar,
    addCalendarEntryForCalendar,
    updateCalendarEntry,
    deleteCalendarEntry
}
