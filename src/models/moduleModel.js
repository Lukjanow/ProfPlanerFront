

export class ModuleModel {
    constructor(moduleId, name, code, dozentIdList, roomIdList, studySemesterIdList, duration, approximateAttendance, need, typeList,
                frequency, selected, color, note, groups) {
        this.module_id = moduleId;
        this.name = name;
        this.code = code;
        this.dozent = dozentIdList;
        this.room = roomIdList;
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
        this._id = jsonObj._id;
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

export class ModuleDetailsModel {
  constructor(moduleId, name, code, extraList, approximateAttendance, 
              frequency, selected, color, note, qsp, studyCourse, studySemester) {
      this.module_id = moduleId;
      this.name = name;
      this.code = code;
      this.events = extraList;
      this.approximate_attendance = approximateAttendance;
      this.frequency = frequency;
      this.selected = selected;
      this.color = color;
      this.note = note;
      this.qsp = qsp;
      this.studyCourse = studyCourse;
      this.studySemester = studySemester;
  }

  setJsonObj(jsonObj) {
      this._id = jsonObj._id;
      this.module_id = jsonObj.module_id;
      this.name = jsonObj.name;
      this.code = jsonObj.code;
      this.extraList = jsonObj.events;
      this.duration = jsonObj.duration;
      this.approximate_attendance = jsonObj.approximate_attendance;
      this.frequency = jsonObj.frequency;
      this.selected = jsonObj.selected;
      this.color = jsonObj.color;
      this.note = jsonObj.note;
      this.groups = jsonObj.groups;
      this.qsp = jsonObj.qsp;
      this.studyCourse = jsonObj.studyCourse;
      this.studySemester = jsonObj.studySemester;
      return this;
  }
}
