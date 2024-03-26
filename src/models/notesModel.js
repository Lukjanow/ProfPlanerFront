export class NoteModel {
    constructor(text) {
      this.text = text;
    }
  
    setJsonObj(jsonObj) {
      this._id = jsonObj._id;
      this.text = jsonObj.text;
      return this;
    }
  }
  