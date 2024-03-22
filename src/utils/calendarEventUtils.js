import moment from 'moment';
import {
    printArrAsString,
    printMapAsStringByKey,
    printMapAsStringByKeys, printStringWithEllipsis
} from "./stringUtils.js";


export function getEventStart(time_stamp) {
    var start = moment("2024-01-01T12:00").toDate()
    start.setDate(time_stamp.week_day)
    start.setHours(time_stamp.hour)
    start.setMinutes(time_stamp.minute)
    return start
}

export function getEventEnd(start, duration) {
    const startHours = start.getHours()
    const startMinutes = start.getMinutes()
    const durationHours = Math.floor(duration / 60)
    const durationMinutes = duration % 60
    var endMinutes = startMinutes + durationMinutes
    var endHours = startHours + durationHours
    if (endMinutes >= 60) {
        endHours += 1
        endMinutes -= 60
    }
    var end = moment("2024-01-01T12:00").toDate()
    end.setDate(start.getDay())
    end.setHours(endHours)
    end.setMinutes(endMinutes)
    return end
}

export function parseEvent(moduleCalendarEntry, module, start, end, isAlgo) {
    const study_semester_string = module.study_semester
        ? printArrAsString(getEveryStudySemesterString(module.study_semester))
        : "-";
    const dozent_string = module.dozent?.length > 0
        ? printMapAsStringByKeys(module.dozent, ["prename", "lastname"])
        : "-";
    const room_string = module.room?.length > 0
        ? printMapAsStringByKey(module.room, "roomNumber")
        : "-";
    const color = module.color ?? "#eeeeee";
    const study_semester_string_short = module.study_semester
        ? getShortStudySemesterStringFormat(module.study_semester)
        : "-";
    const dozent_string_short = module.dozent?.length > 0
        ? getShortDozentStringFormat(module.dozent)
        : "-";
    const room_string_short = module.room?.length > 0
        ? getShortRoomStringFormat(module.room)
        : "-";

    return {
        _id: module._id,
        name: module.name,
        start: start,
        end: end,
        study_semester_string: study_semester_string,
        study_semester_string_short: study_semester_string_short,
        study_semester: module.study_semester,
        dozent_string: dozent_string,
        dozent_string_short: dozent_string_short,
        dozent: module.dozent,
        room_string: room_string,
        room_string_short: room_string_short,
        room: module.room,
        backgroundcolor: color,
        bordercolor: changeColor(color, -40),
        duration: module.duration,
        visible: true,
        isPlaced: Boolean(moduleCalendarEntry),
        calendar_entry_id: moduleCalendarEntry === null ? -1 : moduleCalendarEntry._id,
        isAlgo: isAlgo
    }
}

export function changeColor(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

// function getAllStudySemesterString(study_semester) {
//     var all_study_semester_string = String(study_semester[0].name)
//     for (let i = 1; i < study_semester.length; i++) {
//         all_study_semester_string = all_study_semester_string + ", " + String(study_semester[i].name)
//     }
//     return all_study_semester_string
// }
//
// function getAllRoomString(room) {
//     var all_room_string = String(room[0].roomNumber)
//     for (let i = 1; i < room.length; i++) {
//         all_room_string = all_room_string + ", " + String(room[i].roomNumber)
//     }
//     return all_room_string
// }

// function getAllDozentString(dozent) {
//     var all_dozent_string = String(dozent[0].prename) + " " + String(dozent[0].lastname)
//     for (let i = 1; i < dozent.length; i++) {
//         all_dozent_string = all_dozent_string + ", " + String(dozent[i].prename) + " " + String(dozent[i].lastname)
//     }
//     return all_dozent_string
// }

function getEveryStudySemesterString(studySemesters, separator = " ") {
    var string_list = []
    for (const studySemester of studySemesters) {
        for (const semester of studySemester.semesterNumbers) {
            string_list.push(String(studySemester.studyCourse.name) + separator + "Semester " + String(semester))
        }
        for (const content of studySemester.content) {
            string_list.push(String(studySemester.studyCourse.name) + separator + String(content))
        }
    }
    return string_list;
}

function getShortStudySemesterStringFormat(studySemesters, separator = " ") {
    const studySemester = studySemesters?.[0] ?? null;
    const semester = studySemester?.semesterNumbers?.[0] ?? null;
    const content = studySemester?.content?.[0] ?? null;

    if (semester) {
        return printStringWithEllipsis(studySemester.studyCourse.name + separator + "Semester " + semester);

    } else if (content) {
        return printStringWithEllipsis(studySemester.studyCourse.name + separator + content);
    }

    return "";
}

function getShortDozentStringFormat(dozentList, separator = " ") {
    const dozent = dozentList?.[0] ?? null;
    const prename = dozent?.prename ?? null;
    const lastname = dozent?.lastname ?? null;

    if (prename || lastname) {
        return printStringWithEllipsis(prename + separator + lastname);
    }

    return "";
}

function getShortRoomStringFormat(roomList) {
    const room = roomList?.[0] ?? null;
    const roomNumber = room?.roomNumber ?? null;

    if (roomNumber) {
        return printStringWithEllipsis(roomNumber);
    }

    return "";
}

// function listToString(list) {
//     var list_string = list[0]
//     for (let i = 1; i < list.length; i++) {
//         list_string = list_string + ", " + list[i];
//     }
//     return list_string
// }
