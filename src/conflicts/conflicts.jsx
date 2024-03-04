import Conflict from "./Conflict";
//

//function to prove if two modules are overlaping
//returns boolean value (true = do overlap, false = do not overlap)
function overlap(mod1, mod2, optional_break=0){
    console.log(mod1.start.getHours())
    console.log(mod1.start.getMinutes())
    console.log(mod1.start.getDay())
    if(mod1.start.getDay() == mod2.start.getDay()) {
        const start1 = mod1.start.getHours() * 60 + mod1.start.getMinutes()
        const start2 = mod2.start.getHours() * 60 + mod2.start.getMinutes()
        if(start1 + mod1.duration + optional_break > start2 && start2 + mod2.duration + optional_break > start1) {
            return true
        }
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
// console.log(overlap(mod1,mod2))


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
    console.log("MODUL LIST")
    console.log(module_list)
    //1 MODUL NEHMEN
    // let module = null;
    // for (let i = 0; i < module_list.length; i++) {
    //     if (module_list[i].id === module_id) {
    //         module = module_list[i];
    //         break;
    //     }
    // }
    const module = module_id
    console.log("MODUL")
    console.log(module)

    //MODULE LIST FILTERN
    // for (let i = 0; i < module_list.length; i++) {
    //     if (module_list[i].planned === false) {
    //         module_list.splice(i, 1);
    //         i--;
    //     }
    // }
    //for each module in module list
    //if module is not planned, drop from list

    //2 MODUL ARRAYS ERSTELLEN

    const dozent_list = module.dozent
    var dozent_dict = {}
    for (let i = 0; i < module.dozent.length; i++) {
        dozent_dict[module.dozent[i]] = []
    }

    var room_dict = {}
    for (let i = 0; i < module.room.length; i++) {
        room_dict[module.room[i]] = []
    }

    var studySemester_dict = {}
    for (let i = 0; i < module.studySemester.length; i++) {
        studySemester_dict[module.studySemester[i]] = []
    }

    //for each module in module list
    for (let i = 0; i < module_list.length; i++) {
        //for each dozent in module
        for (let j = 0; j < module_list[i].dozent.length; j++) {
            //for each dozent in dozent_dict
            for (const [key, value] of Object.entries(dozent_dict)) {
                if (module_list[i].dozent[j] == key) {
                    if(module_list[i] != module) {
                        value.push(module_list[i])
                    }
                }
            }
        }
        //for each room in module
        for (let j = 0; j < module_list[i].room.length; j++) {
            //for each room in dozent_dict
            for (const [key, value] of Object.entries(room_dict)) {
                if (module_list[i].room[j] == key) {
                    if(module_list[i] != module) {
                        value.push(module_list[i])
                    }
                }
            }
        }
        //for each studySemester in module
        for (let j = 0; j < module_list[i].studySemester.length; j++) {
            //for each studySemester in dozent_dict
            for (const [key, value] of Object.entries(studySemester_dict)) {
                if (module_list[i].studySemester[j] == key) {
                    if(module_list[i] != module) {
                        value.push(module_list[i])
                    }
                }
            }
        }
    }

    console.log(dozent_dict)
    console.log(room_dict)
    console.log(studySemester_dict)

    for (let i = 0; i < conflict_list.length; i++) {
        dozent_dict[module.dozent[i]] = []
        if(conflict_list[i].mod1 === module || conflict_list[i].mod2 === module){
            conflict_list.splice(i, 1);
            i--;
        }
    }


    for (const [key, value] of Object.entries(dozent_dict)) {
        for (let i = 0; i < value.length; i++) {
            if(overlap(module, value[i])) {
                conflict_list.push(new Conflict(module, value[i], key, 1))
            }
        }
    }


    //3 CONFLICT ARRAY FILTERN
    //for each conflict in conflict list
    //if conflict contains module
    //delete conflict



    //4 KONFLIKTE ERKENNEN
    for (let i = 0; i < conflict_list.length; i++) {
        conflict_list[i].printError()
    }
    return conflict_list
}


// checkModuleWarnings(moduleItemDataList, [], 1)

export {checkModuleWarnings}