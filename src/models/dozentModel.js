export class DozentModel {
    constructor(jsonObj) {
        this.id = jsonObj.id;
        this.name = jsonObj.name;
        this.email = jsonObj.e_mail;
        this.title = jsonObj.title;
        this.intern = jsonObj.intern;
    }
}
