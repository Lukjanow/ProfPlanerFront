import Conflict from "./Conflict";
//

//function to prove if two modules are overlaping
//returns boolean value (true = do overlap, false = do not overlap)
function overlap(mod1, mod2, optional_break=0){
    // console.log(mod1.start.getHours())
    // console.log(mod1.start.getMinutes())
    // console.log(mod1.start.getDay())
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

function checkMiddayPause(module_list){
    let day = module_list[0].start.getDay()
    console.log("MIDDAY PAUSE")
    var pauseStart = 11 * 60 + 30
    let pauseEnd = 14 * 60 + 30
    while(pauseStart <= pauseEnd - 45){
        var value = true
        //check start of pause
        for (let i = 0; i < module_list.length; i++) {
            const moduleStart = module_list[i].start.getHours() * 60 + module_list[i].start.getMinutes()
            const moduleEnd = moduleStart + module_list[i].duration
            if (moduleStart <= pauseStart && pauseStart < moduleEnd) {
                pauseStart = moduleEnd
                value = false
                break;
            }
        }
        //check end of pause
        if (value) {
            for (let i = 0; i < module_list.length; i++) {
                const moduleStart = module_list[i].start.getHours() * 60 + module_list[i].start.getMinutes()
                const moduleEnd = moduleStart + module_list[i].duration
                if (moduleStart < pauseStart + 45 && pauseStart +45 <= moduleEnd) {
                    pauseStart = moduleEnd
                    value = false
                    break;
                }
            }   
        }
        if(value){
            return false
        }
    }
    return true
}


function getNewSemester(semester, next=true){
    let newSemesterNumber = parseInt(semester.charAt(semester.length - 1));
    if(next) {
        newSemesterNumber += 1
    } else {
        newSemesterNumber -= 1
    }
    let newSemester = semester.slice(0, -1) + String(newSemesterNumber);
    return newSemester
}



function deleteConflictsWithCurrentModule(conflict_list, module) {
    for (let i = 0; i < conflict_list.length; i++) {
        if(conflict_list[i].mod1.id == module.id || conflict_list[i].mod2.id == module.id){
            conflict_list.splice(i, 1);
            i--;
        }
    }
    return conflict_list
}


function checkModuleWarnings(module_list, conflict_list, module_id){
    // console.log("MODUL LIST")
    // console.log(module_list)
    //1 MODUL NEHMEN
    // let module = null;
    // for (let i = 0; i < module_list.length; i++) {
    //     if (module_list[i].id === module_id) {
    //         module = module_list[i];
    //         break;
    //     }
    // }
    const module = module_id
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
    function updateDictionary(dict, currentModule, module, property) {
        if (currentModule !== module) {
            for (const item of currentModule[property]) {
                if (dict.hasOwnProperty(item)) {
                    dict[item].push(currentModule);
                }
            }
        }
    }

    for (const currentModule of module_list) {
        updateDictionary(dozent_dict, currentModule, module, 'dozent');
        updateDictionary(room_dict, currentModule, module, 'room');
        updateDictionary(studySemester_dict, currentModule, module, 'studySemester');
    }


    // CONFLICT LIST EINTRÄGE MIT AKTUELLLEM MODUL WERDEN GELÖSCHT
    for (let i = 0; i < conflict_list.length; i++) {
        if(conflict_list[i].mod1.id == module.id || conflict_list[i].mod2.id == module.id){
            conflict_list.splice(i, 1);
            i--;
        }
    }

    // CONFLICT LIST EINTRÄGE WERDEN ERSTELLT
    for (const [key, value] of Object.entries(dozent_dict)) {
        for (let i = 0; i < value.length; i++) {
            if(overlap(module, value[i])) {
                if(module.type === "Modul" && value[i].type === "Modul") {
                    conflict_list.push(new Conflict(module, value[i], key, 1))
                } else if((module.type === "Modul" && value[i].type === "Abwesenheit") || (module.type === "Abwesenheit" && value[i].type === "Modul")) {
                    conflict_list.push(new Conflict(module, value[i], key, 2))
                }
            }
        }
    }
    for (const [key, value] of Object.entries(room_dict)) {
        for (let i = 0; i < value.length; i++) {
            if(overlap(module, value[i])) {
                conflict_list.push(new Conflict(module, value[i], key, 6))
            }
        }
    }
    for (const [key, value] of Object.entries(studySemester_dict)) {
        const prevValue = getNewSemester(key, false)
        const nextValue = getNewSemester(key, true)
        var prevList = []
        var nextList = []
        for (let i = 0; i < module_list.length; i++) {
            //for each studySemester in module
            for (let j = 0; j < module_list[i].studySemester.length; j++) {
                if (module_list[i].studySemester[j] == prevValue) {
                    if(module_list[i] != module) {
                        prevList.push(module_list[i])
                    }
                }
                else if (module_list[i].studySemester[j] == nextValue) {
                    if(module_list[i] != module) {
                        nextList.push(module_list[i])
                    }
                }
            }
        }
        for (let i = 0; i < value.length; i++) {
            if(overlap(module, value[i])) {
                conflict_list.push(new Conflict(module, value[i], key, 3))  
            }
        }
        for (let i = 0; i < prevList.length; i++) {
            if(overlap(module, prevList[i])) {
                    conflict_list.push(new Conflict(module, prevList[i], prevValue, 5, key))  
            }
        }
        for (let i = 0; i < nextList.length; i++) {
            if(overlap(module, nextList[i])) {
                    conflict_list.push(new Conflict(module, nextList[i], key, 5, nextValue))  
            }
        }
        //CONFLICT 7
        const moduleStart = module.start.getHours() * 60 + module.start.getMinutes()
        const moduleEnd = moduleStart + module.duration
        console.log(moduleStart)
        console.log(moduleEnd)
        if(!(moduleStart >= 14 * 60 + 30 || moduleEnd <= 11 * 60 + 30)){
            var dayModuleList = []
            for (let i = 0; i < value.length; i++) {
                //only get modules from same day
                if (value[i].start.getDay() == module.start.getDay()) {
                    console.log(value[i])
                    const imoduleStart = value[i].start.getHours() * 60 + value[i].start.getMinutes()
                    const imoduleEnd = imoduleStart + value[i].duration
                    if(!(imoduleStart >= 14 * 60 + 30 || imoduleEnd <= 11 * 60 + 30)){
                        dayModuleList.push(value[i])
                    }
                }
            }
            dayModuleList.push(module)
            // console.log(checkMiddayPause(dayModuleList))
            if(checkMiddayPause(dayModuleList)) {
                conflict_list.push(new Conflict(module, dayModuleList[0], key, 7))
            }
        }
    }


    //3 CONFLICT ARRAY FILTERN
    //for each conflict in conflict list
    //if conflict contains module
    //delete conflict



    //4 KONFLIKTE AUSGEBEN
    for (let i = 0; i < conflict_list.length; i++) {
        conflict_list[i].printError()
    }
    return conflict_list
}


// checkModuleWarnings(moduleItemDataList, [], 1)

export {checkModuleWarnings, deleteConflictsWithCurrentModule}