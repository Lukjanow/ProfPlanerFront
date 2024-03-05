export class DozentModel {
    constructor(prename, lastname, email, title, salutation) {
        this.prename = prename;
        this.lastname = lastname;
        this.email = email;
        this.title = title;
        this.salutation = salutation;
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.prename = jsonObj.prename;
        this.lastname = jsonObj.lastname;
        this.email = jsonObj.email;
        this.title = jsonObj.title;
        this.salutation = jsonObj.salutation;
        return this;
    }
}
