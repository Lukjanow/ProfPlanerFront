export class CalendarModel {
    constructor(name, calendarEntryIdList) {
        this.name = name;
        this.entries = calendarEntryIdList;
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.name = jsonObj.name;
        this.entries = jsonObj.entries
        return this;
    }
}
