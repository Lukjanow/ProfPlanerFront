// TODO: Mit DozentModel.js zusammenführen
export default class TeacherModel {
    constructor(salutation = "keine Angabe", title = "keine Angabe", prename = "", lastname = "", email = "", intern = true) {
        this.salutation = salutation
        this.title = title
        this.prename = prename
        this.lastname = lastname
        this.email = email
    }
}