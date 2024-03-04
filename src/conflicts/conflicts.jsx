//

const moduleItemDataList = [
    {
      id: 1,
      title: "Einführung in die Informatik",
      start: moment("2024-01-01T12:00").toDate(),
      end: moment("2024-01-01T15:00").toDate(),
      studySemester: "Angewandte Informatik, 1. FS",
      dozent: "Herbert Thielen",
      room: "A200",
      backgroundcolor: "#D6F5E2",
      bordercolor: "#46D27F",
      duration: 195,
      planned: false,
    },
    {
      id: 2,
      title: "Rechnernetze und Netzwerksicherheit",
      start: moment("2024-01-01T12:00").toDate(),
      end: moment("2024-01-01T15:00").toDate(),
      studySemester: "AI-B 2, WI-B 4",
      dozent: "Herbert Thielen",
      room: "A200",
      backgroundcolor: "#d5a6bd",
      bordercolor: "#d32e7f",
      duration: 195,
      planned: false,
    },
    {
      id: 3,
      title: "Betriebssysteme",
      start: moment("2024-01-01T12:00").toDate(),
      end: moment("2024-01-01T15:00").toDate(),
      studySemester: "Angewandte Informatik, 2. FS",
      dozent: "Jens Kohler",
      room: "D137",
      backgroundcolor: "#ca9966",
      bordercolor: "#6f4316",
      duration: 195,
      planned: false,
    },
    {
      id: 4,
      title: "Softwarequalität",
      start: moment("2024-01-01T12:00").toDate(),
      end: moment("2024-01-01T15:00").toDate(),
      studySemester: "Bachelor AI 3",
      dozent: "Herbert Thielen",
      room: "N37",
      backgroundcolor: "#a2c4c9",
      bordercolor: "#106875",
      duration: 195,
      planned: false,
    },
    {
    id: 5,
    title: "Datenbanken",
    start: moment("2024-01-01T12:00").toDate(),
    end: moment("2024-01-01T15:00").toDate(),
    studySemester: "Angewandte Informatik, 2. FS",
    dozent: "Norman Riegel",
    room: "D138",
    backgroundcolor: "#36abad",
    bordercolor: "#1b8f90",
    duration: 195,
    planned: false,
  },
  {
    id: 6,
    title: "Fullstack Webanwendungen",
    start: moment("2024-01-02T14:00").toDate(),
    end: moment("2024-01-02T18:00").toDate(),
    studySemester: "Angewandte Informatik, 4. FS",
    dozent: "Jens Kohler",
    room: "A200",
    backgroundcolor: "#ea9999",
    bordercolor: "#e70000",
    duration: 195,
    planned: false,
  }
  ];

//function to prove if two modules are overlaping
//returns boolean value (true = do overlap, false = do not overlap)
function overlap(mod1, mod2, optional_break=0){
    if(mod1.start + mod1.duration + optional_break > mod2.start && mod2.start + mod2.duration + optional_break > mod1.start) {
        return true
    }
    return false
}

//testing overlap
const mod1 = {
    start: 15 * 60,
    duration: 195,
}
const mod2 = {
    start: 10 * 60,
    duration: 195,
}
console.log(overlap(mod1,mod2))


function checkProfConflict1(dozent) {
    dozent.getModules();
}




//checks all warnings in the timetable
function checkWarnings() {
    //create conflict list

    //check conflict 1 + 2
        //get all profs
        //for each prof
        //get all modules + absences
        //for each module
        //do overlap function with every module with higher index
        //if true and both are modules, add to conflict list with index 1
        //if true and one is module and one is absence, add to conflict list with index 2

    //check conflict 3 + 4 + 7
        //get all StudySemester (only normal and QSP)
        //for each Studysemester
        //get all modules (only mandatory)
        //for each module
        //do overlap function with every module with higher index
        //if true and StudySemester is normal, add to conflict list with index 3
        //if true and StudySemester is QSP, add to conflict list with index 4
        //if false, do overlap function again with breack=45
        //if then true, add to conflict list with index 7

    //check conflict 5
        //get all StudySemester (only normal)
        //for each StudySemester (except the last in every study)
        //get all modules (only mandatory)
        //for each module
        //do overlap function with every module from the next StudySemester
        //if true, add to conflict list with index 5

    //check conflict 6
        //get all rooms
        //for each room
        //get all modules
        //for each module
        //do overlap function with every module with higher index
        //if true, add to conflict list with index 6
}

function checkModuleWarnings(module_list, conflict_list, module_id){
    //1 MODUL NEHMEN
    let module = null;
    for (let i = 0; i < module_list.length; i++) {
        if (module_list[i].id === module_id) {
            module = module_list[i];
            break;
        }
    }
    
    //MODULE LIST FILTERN
    for (let i = 0; i < module_list.length; i++) {
        if (module_list[i].planned === false) {
            module_list.splice(i, 1);
            i--;
        }
    }
    //for each module in module list
    //if module is not planned, drop from list

    //2 MODUL ARRAYS ERSTELLEN
    const dozent_list = module.dozent
    const room_list = module.rooms
    const studySemester_list = module.studySemester

    //for each dozent in dozent_list
    //create list

    //for each room in room_list
    //create list

    //for each studySemester in studySemester_list
    //create list

    //for each module in module list
    //if module.dozent contains dozent
    //add to list
    //if module.rooms contains room
    //add to list
    //if module.studySemester contains StudySemester
    //add to list

    //3 CONFLICT ARRAY FILTERN
    //for each conflict in conflict list
    //if conflict contains module
    //delete conflict

    //4 KONFLIKTE ERKENNEN
}


checkModuleWarnings(moduleItemDataList, [], 1)