

export class ModuleModel {
    constructor(moduleId, name, code, dozentIdList, roomIdList, studySemesterIdList, duration, approximateAttendance,
                frequency, selected, color, note, study_course) {
        this.module_id = moduleId;
        this.name = name;
        this.code = code;
        this.dozent = dozentIdList;
        this.room = roomIdList;
        this.study_semester = studySemesterIdList;
        this.duration = duration;
        this.approximate_attendance = approximateAttendance;
        this.frequency = frequency;
        this.selected = selected;
        this.color = color;
        this.note = note;
        this.study_course = study_course;
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.module_id = jsonObj.module_id;
        this.name = jsonObj.name;
        this.code = jsonObj.code;
        this.dozent = jsonObj.dozent;
        this.room = jsonObj.room;
        this.study_semester = jsonObj.study_semester;
        this.duration = jsonObj.duration;
        this.approximate_attendance = jsonObj.approximate_attendance;
        this.frequency = jsonObj.frequency;
        this.selected = jsonObj.selected;
        this.color = jsonObj.color;
        this.note = jsonObj.note;
        this.study_course = jsonObj.study_course;
        return this;
    }
}

export class ModuleBasicModel {
  constructor(jsonObj) {
    this._id = jsonObj._id;
    this.name = jsonObj.name;
    this.dozent = jsonObj.dozent;
    this.room = jsonObj.room;
    this.studySemester = jsonObj.study_semester;
    this.duration = jsonObj.duration;
  }
}