export class RoomModel {
    constructor(jsonObj) {
        this.id = jsonObj.id;
        this.name = jsonObj.name;
        this.capacity = jsonObj.capacity;
        this.equipment = jsonObj.equipment;
    }
}
