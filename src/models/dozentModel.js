export class DozentModel {
    constructor(salutation = "keine Angabe", title = "keine Angabe", prename = "", lastname = "", email = "", intern = true) {
        this.salutation = salutation
        this.title = title
        this.prename = prename
        this.lastname = lastname
        this.email = email
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.name = jsonObj.name;
        this.email = jsonObj.email;
        this.title = jsonObj.title;
        this.intern = jsonObj.intern;
        return this;
    }
}
