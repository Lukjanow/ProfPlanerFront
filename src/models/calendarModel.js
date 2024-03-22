export class CalendarModel {
    constructor(name, calendarEntryIdList, frequency, last_opening) {
        this.name = name;
        this.entries = calendarEntryIdList;
        this.frequency = frequency
        this.last_opening = last_opening
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.name = jsonObj.name;
        this.entries = jsonObj.entries
        this.frequency = jsonObj.frequency
        this.last_opening = jsonObj.last_opening
        return this;
    }
}
