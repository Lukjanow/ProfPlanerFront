// TODO: Mit DozentModel.js zusammenführen
export default class TeacherModel {
    constructor(title = "", prename = "", lastname = "", email = "", intern = true) {
        this.title = title
        this.prename = prename
        this.lastname = lastname
        this.email = email
        this.intern = intern
    }
}