import Conflict from "./Conflict";

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


function checkMiddayPause(module_list, pauseStart, pauseEnd, pauseDuration){
    let day = module_list[0].start.getDay()
    while(pauseStart <= pauseEnd - pauseDuration){
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
                if (moduleStart < pauseStart + pauseDuration && pauseStart + pauseDuration <= moduleEnd) {
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


function updateDictionary(dict, currentModule, module, property) {
    if (currentModule !== module) {
        for (const item of currentModule[property]) {
            if (dict.hasOwnProperty(item)) {
                dict[item].push(currentModule);
            }
        }
    }
}


function checkModuleWarnings(module_list, conflict_list, module){
    //CREATE DICTIONARIES FOR THE DOZENT, ROOM & STUDYSEMESTER OF THE CURRENT MODULE
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

    //FILL THE DICTIONARIES WITH ALL MODULES WITH THE SAME VALUE
    //for each module in module list
    for (const currentModule of module_list) {
        updateDictionary(dozent_dict, currentModule, module, 'dozent');
        updateDictionary(room_dict, currentModule, module, 'room');
        updateDictionary(studySemester_dict, currentModule, module, 'studySemester');
    }


    //DELETE ALL CONFLICTS WITH THE CURRENT MODULE
    for (let i = 0; i < conflict_list.length; i++) {
        if(conflict_list[i].mod1.id == module.id || conflict_list[i].mod2.id == module.id){
            conflict_list.splice(i, 1);
            i--;
        }
    }

    //CREATE NEW CONFLICTS WITH THE DICTIONARIES
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
        if(!(moduleStart >= 14 * 60 + 30 || moduleEnd <= 11 * 60 + 30)){
            var dayModuleList = []
            for (let i = 0; i < value.length; i++) {
                //only get modules from same day
                if (value[i].start.getDay() == module.start.getDay()) {
                    const imoduleStart = value[i].start.getHours() * 60 + value[i].start.getMinutes()
                    const imoduleEnd = imoduleStart + value[i].duration
                    if(!(imoduleStart >= 14 * 60 + 30 || imoduleEnd <= 11 * 60 + 30)){
                        dayModuleList.push(value[i])
                    }
                }
            }
            dayModuleList.push(module)
            if(checkMiddayPause(dayModuleList, 11 * 60 + 30, 14 * 60 + 30, 45)) {
                conflict_list.push(new Conflict(module, dayModuleList[0], key, 7))
            }
        }
    }

    //4 KONFLIKTE IN DER KONSOLE AUSGEBEN
    for (let i = 0; i < conflict_list.length; i++) {
        conflict_list[i].printError()
    }
    return conflict_list
}

export {checkModuleWarnings, deleteConflictsWithCurrentModule}