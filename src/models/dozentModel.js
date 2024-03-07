export class DozentModel {
    constructor(salutation = "keine Angabe", title = "keine Angabe", prename = "", lastname = "", email = "") {
        this.salutation = salutation
        this.title = title
        this.prename = prename
        this.lastname = lastname
        this.email = email
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.salutation = jsonObj.salutation
        this.title = jsonObj.title
        this.prename = jsonObj.prename
        this.lastname = jsonObj.lastname
        this.email = jsonObj.email
        return this;
    }
}
