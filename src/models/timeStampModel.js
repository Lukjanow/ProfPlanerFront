export class TimeStampModel {
    constructor(weekDay, hour, minute) {
        this.week_day = weekDay;
        this.hour = hour;
        this.minute = minute;
    }

    setJsonObj(jsonObj) {
        this.week_day = jsonObj.week_day;
        this.hour = jsonObj.hour;
        this.minute = jsonObj.minute;
        return this;
    }
}
