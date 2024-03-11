export class StudyCourseModel {
    constructor(name, semesterCount, content) {
        this.name = name;
        this.semesterCount = semesterCount;
        this.content = content;
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.name = jsonObj.name;
        this.semesterCount = jsonObj.semesterCount;
        this.content = jsonObj.content;
        return this;
    }
}
