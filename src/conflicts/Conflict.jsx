class Conflict {
    constructor(mod1, mod2, name, index=0, name2="") {

      this.mod1 = mod1;
      this.mod2 = mod2;
      if(mod1._id != mod2._id){
        this.module_string = "(" + String(mod1.name) + ") & (" + String(mod2.name) + ")"
      } else {
        this.module_string = "(" + String(mod1.name) + ")"
      }
      this.index = index;
      if(mod1._id === mod2._id){
        this.id = String(mod1._id) + "|" + String(mod2._id) + "|" + String(index)
      } else {
        for (let i = 0; i < mod1._id.length; i++) {
          const mod1_num = parseInt(mod1._id[i], 16)
          const mod2_num = parseInt(mod2._id[i], 16)
          if (mod1_num < mod2_num) {
            this.id = String(mod1._id) + "|" + String(mod2._id) + "|" + String(index)
            break;
          } else if (mod2_num < mod1_num){
            this.id = String(mod2._id) + "|" + String(mod1._id) + "|" + String(index)
            break;
          }
        }
      }
      // this.id = mod1.id<=mod2.id ? mod1.id*80*7 + mod2.id*7 + index : mod2.id*80*7 + mod1.id*7 + index

      switch (index) {
        case 1:
          this.error_message = "WARNUNG: Zwei Vorlesungen derselben Lehrperson (" + name + ") überschneiden sich!";
          break;
        case 2:
          this.error_message = "WARNUNG: Eine Vorlesung einer Lehrperson (" + name + ") liegt in ihrer eingetragenen Abwesenheit!";
          break;
        case 3:
          this.error_message = "WARNUNG: Zwei Vorlesungen desselben Semester (" + name + ") überschneiden sich!";
          break;
        case 5:
          this.error_message = "WARNUNG: Zwei Vorlesungen aus aufeinanderfolgenden Semestern (" + name + ", " + name2 + ") überschneiden sich!";
          break;
        case 6:
          this.error_message = "WARNUNG: Zwei Module mit demselben Raum (" + name + ") überschneiden sich!";
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
    }
    printError(){
      console.log(this.error_message)
    }
  }

  export default Conflict