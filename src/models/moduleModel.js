export class ModuleModel {
    constructor(moduleId, name, code, dozentIdList, room, studySemesterIdList, duration, approximateAttendance, need, typeList,
                frequency, selected, color, note, groups) {
        this.module_id = moduleId; // TODO: deprecated
        this.id = moduleId; // TODO: new, should be added
        this.name = name;
        this.code = code;
        this.dozent = dozentIdList;
        this.room = room;
        this.study_semester = studySemesterIdList;
        this.duration = duration;
        this.approximate_attendance = approximateAttendance;
        this.need = need;
        this.type = typeList;
        this.frequency = frequency;
        this.selected = selected;
        this.color = color;
        this.note = note;
        this.groups = groups;
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj.id; // TODO: deprecated
        // this._id = jsonObj._id; // TODO: new, should be added
        this.module_id = jsonObj.module_id;
        this.name = jsonObj.name;
        this.code = jsonObj.code;
        this.dozent = jsonObj.dozent;
        this.room = jsonObj.room;
        this.study_semester = jsonObj.study_semester;
        this.duration = jsonObj.duration;
        this.approximate_attendance = jsonObj.approximate_attendance;
        this.need = jsonObj.need;
        this.type = jsonObj.type;
        this.frequency = jsonObj.frequency;
        this.selected = jsonObj.selected;
        this.color = jsonObj.color;
        this.note = jsonObj.note;
        this.groups = jsonObj.groups;
        return this;
    }
}
