class Conflict {
    constructor(mod1, mod2, name, index=0, name2="", ignore=false) {
      this.mod1 = mod1;
      this.mod2 = mod2;
      this.index = index;
      switch (index) {
        case 1:
          this.error_message = "WARNUNG: zwei Vorlesungen derselben Lehrperson (" + name + ") überschneiden sich!";
          break;
        case 2:
          this.error_message = "WARNUNG: eine Vorlesung einer Lehrperson (" + name + ") liegt in ihrer eingetragenen Abwesenheit!";
          break;
        case 3:
          this.error_message = "WARNUNG: zwei Vorlesungen desselben Semester (" + name + ") überschneiden sich!";
          break;
        case 5:
          this.error_message = "WARNUNG: zwei Vorlesungen aus aufeinanderfolgenden Semestern (" + name + ", " + name2 + ") überschneiden sich!";
          break;
        case 6:
          this.error_message = "WARNUNG: zwei Module mit demselben Raum (" + name + ") überschneiden sich!";
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
          this.error_message = "WARNUNG: die Mittagspause in einem Semester (" + name + ") ist am " + day + " kürzer als 45 Minuten!";
          break;
        default:
          this.error_message = "FEHLER";
          break;
      }
      this.ignore = ignore;
    }
    printError(){
      console.log(this.error_message)
    }
  }

  export default Conflict