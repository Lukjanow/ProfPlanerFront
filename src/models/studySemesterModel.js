export class StudySemesterModel {
    constructor(name, study, content) {
        this.name = name;
        this.study = study;
        this.content = content;
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.name = jsonObj.name;
        this.study = jsonObj.study;
        this.content = jsonObj.content;
        return this;
    }
}
