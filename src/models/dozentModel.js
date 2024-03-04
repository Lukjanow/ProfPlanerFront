export class DozentModel {
    constructor(name, email, title, intern) {
        this.name = name;
        this.e_mail = email;
        this.title = title;
        this.intern = intern;
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.name = jsonObj.name;
        this.e_mail = jsonObj.e_mail;
        this.title = jsonObj.title;
        this.intern = jsonObj.intern;
        return this;
    }
}
