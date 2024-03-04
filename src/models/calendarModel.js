export class CalendarModel {
    constructor(name, entries) {
        this.name = name;
        this.entries = entries;
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.name = jsonObj.name;
        this.entries = jsonObj.entries
        return this;
    }
}
