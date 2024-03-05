export class RoomModel {
  constructor(roomNumber, capacity, roomTypes) {
    this.roomNumber = roomNumber;
    this.capacity = capacity;
    this.roomTypes = roomTypes;
  }

  setJsonObj(jsonObj) {
    this._id = jsonObj._id;
    this.roomNumber = jsonObj.roomNumber;
    this.capacity = jsonObj.capacity;
    this.roomTypes = jsonObj.roomTypes;
    return this;
  }
}
