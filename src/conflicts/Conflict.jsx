class Conflict {
    constructor(mod1, mod2, name, index=0, ignore=false) {
      this.mod1 = mod1;
      this.mod2 = mod2;
      this.index = index;
      switch (index) {
        case 1:
          this.error_message = "WARNUNG: zwei Vorlesungen derselben Lehrperson (" + name + ") überschneiden sich!";
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