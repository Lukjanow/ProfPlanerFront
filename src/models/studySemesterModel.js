export class StudySemesterModel {
    constructor(studyCourse, semesterNumbers, content) {
        this.studyCourse = studyCourse;
        this.semesterNumbers = semesterNumbers;
        this.content = content;
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.studyCourse = jsonObj.studyCourse;
        this.semesterNumbers = jsonObj.semesterNumbers;
        this.content = jsonObj.content;
        return this;
    }
}
