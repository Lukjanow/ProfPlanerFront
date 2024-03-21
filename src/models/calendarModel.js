export class CalendarModel {
    constructor(name, calendarEntryIdList, frequency) {
        this.name = name;
        this.entries = calendarEntryIdList;
        this.frequency = frequency
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.name = jsonObj.name;
        this.entries = jsonObj.entries
        this.frequency = jsonObj.frequency
        return this;
    }
}
