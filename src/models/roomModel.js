export class RoomModel {
  constructor(roomNumber, capacity, roomType) {
    this.roomNumber = roomNumber;
    this.capacity = capacity;
    this.roomType = roomType;
  }

  setJsonObj(jsonObj) {
    this._id = jsonObj._id;
    this.roomNumber = jsonObj.roomNumber;
    this.capacity = jsonObj.capacity;
    this.roomType = jsonObj.roomType;
    return this;
  }
}
