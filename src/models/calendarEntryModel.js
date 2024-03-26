export class CalendarEntryModel {
    constructor(moduleId, timeStampModel, comment) {
        this.module = moduleId;
        this.time_stamp = timeStampModel;
        this.comment = comment;
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.module = jsonObj.module;
        this.time_stamp = jsonObj.time_stamp;
        this.comment = jsonObj.comment;
        return this;
    }
}
