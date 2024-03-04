export class RoomModel {
    constructor(name, capacity, equipment) {
        this.name = name;
        this.capacity = capacity;
        this.equipment = equipment;
    }

    setJsonObj(jsonObj) {
        this._id = jsonObj._id;
        this.name = jsonObj.name;
        this.capacity = jsonObj.capacity;
        this.equipment = jsonObj.equipment;
        return this;
    }
}
