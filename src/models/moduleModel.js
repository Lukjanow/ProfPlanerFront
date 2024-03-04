export class ModuleModel {
    constructor(jsonObj) {
        this.id = jsonObj.id;
        this.name = jsonObj.name;
        this.code = jsonObj.code;
        this.dozent = jsonObj.dozent;
        this.room = jsonObj.room;
        this.studySemester = jsonObj.study_semester;
        this.duration = jsonObj.duration;
        this.approximateAttendance = jsonObj.approximate_attendance;
        this.need = jsonObj.need;
        this.type = jsonObj.type;
        this.frequency = jsonObj.frequency;
        this.selected = jsonObj.selected;
        this.color = jsonObj.color;
        this.note = jsonObj.note;
        this.groups = jsonObj.groups;
    }

    export class ModuleBasicModel {
  constructor(jsonObj) {
    this.id = jsonObj.id;
    this.name = jsonObj.name;
    this.dozent = jsonObj.dozent;
    this.room = jsonObj.room;
    this.studySemester = jsonObj.study_semester;
    this.duration = jsonObj.duration;
  }
}
