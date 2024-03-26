import { useTranslation } from "react-i18next";

class Conflict {
  constructor(mod1, mod2, name, index = 0, name2 = "") {
    this.mod1 = mod1;
    this.mod2 = mod2;
    this.name1 = name;
    this.name2 = name2;
    if (mod1._id != mod2._id) {
      this.module_string = String(mod1.name) + ", " + String(mod2.name)
    } else {
      this.module_string = String(mod1.name)
    }
    if (name2 != "") {
      this.area_string = String(name) + ", " + String(name2)
    } else {
      this.area_string = String(name)
    }
    this.index = index;
    if (mod1._id === mod2._id) {
      this.id = String(mod1._id) + "|" + String(mod2._id) + "|" + String(index)
    } else {
      for (let i = 0; i < mod1._id.length; i++) {
        const mod1_num = parseInt(mod1._id[i], 16)
        const mod2_num = parseInt(mod2._id[i], 16)
        if (mod1_num < mod2_num) {
          this.id = String(mod1._id) + "|" + String(mod2._id) + "|" + String(index)
          break;
        } else if (mod2_num < mod1_num) {
          this.id = String(mod2._id) + "|" + String(mod1._id) + "|" + String(index)
          break;
        }
      }
    }
    // this.id = mod1.id<=mod2.id ? mod1.id*80*7 + mod2.id*7 + index : mod2.id*80*7 + mod1.id*7 + index

    switch (index) {
      case 1:
        this.error_message = "eventSameDozent";
        break;
      case 2:
        this.error_message = "eventDozentNotPresent";
        break;
      case 3:
        this.error_message = "eventSameSemester";
        break;
      case 5:
        this.error_message = "eventSequentialSemesters";
        break;
      case 6:
        this.error_message = "eventSameRoom";
        break;
      case 7:
        var day = ""
        switch (mod1.start.getDay()) {
          case 1:
            day = "Montag"
            break;
          case 2:
            day = "Dienstag"
            break;
          case 3:
            day = "Mittwoch"
            break;
          case 4:
            day = "Donnerstag"
            break;
          case 5:
            day = "Freitag"
            break;
          default:
            "ERROR"
            break;
        }
        this.error_message = "breakTooShort";
        break;
      default:
        this.error_message = "ERROR";
        break;
    }
  }

  printError() {
    console.log(this.error_message)
  }
}

export default Conflict