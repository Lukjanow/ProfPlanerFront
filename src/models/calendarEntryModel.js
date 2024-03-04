export class CalendarEntryModel {
    constructor(module, timeStampModel, comment) {
        this.module = module;
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
