export class DozentModel {
    constructor(jsonObj) {
        this._id = jsonObj._id;
        this.name = jsonObj.name;
        this.email = jsonObj.e_mail;
        this.title = jsonObj.title;
        this.absences = jsonObj.absences;
        this.intern = jsonObj.intern;
    }
}
