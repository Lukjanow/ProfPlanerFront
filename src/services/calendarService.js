import api from "./api.js";
import {CalendarModel} from "../models/calendarModel.js";
import {CalendarEntryModel} from "../models/calendarEntryModel.js";

// TODO: routes needed: getAllCalendars, updateCalendar, getCalendarEntriesFromCalendar

// TODO: missing routes?
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

// TODO: check
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

// TODO: check
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

// TODO: missing route?
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

// TODO: check
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

// TODO: check
// TODO: calendarId necessary?
async function getCalendarEntryForCalendar(calendarId, calendarEntryId) {
    return api
        .get(`/calendar/calendarentry/${calendarId}/${calendarEntryId}`)
        .then(resObj => {
            return {
                data: new CalendarEntryModel().setJsonObj(resObj.data),
                status: resObj.status
            }
        });
}

// TODO: check
async function getCalendarEntriesForStudySemester(calendarId, studySemesterId) {
    return api
        .get(`/calendar/studysemester/${calendarId}/${studySemesterId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new CalendarEntryModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

// TODO: check
async function getCalendarEntriesForDozent(calendarId, dozentId) {
    return api
        .get(`/calendar/dozent/${calendarId}/${dozentId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new CalendarEntryModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

// TODO: check
async function getCalendarEntriesForRoom(calendarId, roomId) {
    return api
        .delete(`/calendar/room/${calendarId}/${roomId}`)
        .then(resObj => {
            return {
                data: resObj.data.map(item => new CalendarEntryModel().setJsonObj(item)),
                status: resObj.status
            }
        });
}

// TODO: possible to read calendarId from body?
// TODO: check
async function addCalendarEntryForCalendar(calendarEntryModel) {
    return api
        .post(`/calendar/calendarentry`, calendarEntryModel)
        .then(resObj => {
            return {
                data: resObj.data,
                status: resObj.status
            }
        });
}

// TODO: check
async function updateCalendarEntryForCalendar(calendarId, calendarEntryId, {
    name = null,
    entryIdList = null,
}) {
    return api
        .put(`/calendar/calendarentry/${calendarId}/${calendarEntryId}`, {
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

// TODO: check
// TODO: calendarId missing
async function deleteCalendarEntryForCalendar(calendarId, calendarEntryId) {
    return api
        .delete(`/calendar/calendarentry/${calendarId}/${calendarEntryId}`)
        .then(resObj => {
            return {
                data: new CalendarEntryModel().setJsonObj(resObj.data),
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
    getCalendarEntryForCalendar,
    getCalendarEntriesForStudySemester,
    getCalendarEntriesForDozent,
    getCalendarEntriesForRoom,
    addCalendarEntryForCalendar,
    updateCalendarEntryForCalendar,
    deleteCalendarEntryForCalendar
}
