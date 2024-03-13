import Conflict from "./Conflict";

//function to prove if two modules are overlaping
//returns boolean value (true = do overlap, false = do not overlap)
function overlap(mod1, mod2, optional_break=0){
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

function getConflictName(module, id, category=""){
    switch (category) {
        case "dozent":
            for (const dozent of module.dozent) {
                if(dozent._id == id){
                    return String(dozent.prename) + " " + String(dozent.lastname)
                }
            }
            break;
        case "room":
            for (const room of module.room) {
                if(room._id == id){
                    return String(room.roomNumber)
                }
            }
            break;
        case "study_semester":
            for (const study_semester of module.study_semester) {
                if(study_semester._id == id){
                    return String(study_semester.name)
                }
            }
        default:
            for (const dozent of module.dozent) {
                if(dozent._id == id){
                    return String(dozent.prename) + " " + String(dozent.lastname)
                }
            }
            for (const room of module.room) {
                if(room._id == id){
                    return String(room.roomNumber)
                }
            }
            for (const study_semester of module.study_semester) {
                if(study_semester._id == id){
                    return String(study_semester.name)
                }
            }
            break;
    }
    return id;
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
        if(conflict_list[i].mod1._id == module._id || conflict_list[i].mod2._id == module._id){
            conflict_list.splice(i, 1);
            i--;
        }
    }
    return conflict_list
}


function updateDictionary(dict, currentModule, module, property) {
    if (currentModule !== module) {
        //loop through every dozent/room/study_semester in module
        for (const item of currentModule[property]) {

            if (dict.hasOwnProperty(item._id)) {
                dict[item._id].push(currentModule);
            }
        }
    }
}


function checkModuleWarnings(module_list, conflict_list, module){
    //CREATE DICTIONARIES FOR THE DOZENT, ROOM & STUDYSEMESTER OF THE CURRENT MODULE
    var dozent_dict = {}
    for (let i = 0; i < module.dozent.length; i++) {
        dozent_dict[module.dozent[i]._id] = []
    }

    var room_dict = {}
    for (let i = 0; i < module.room.length; i++) {
        room_dict[module.room[i]._id] = []
    }

    // var study_semester_dict = {}
    // for (let i = 0; i < module.study_semester.length; i++) {
    //     study_semester_dict[module.study_semester[i]._id] = []
    // }

    var study_semester_dict = {}
    for (let i = 0; i < module.study_semester.length; i++) {
        for (let j = 0; j < module.study_semester[i].semesterNumbers.length; j++) {
            const semester_name = String(module.study_semester[i].studyCourse.name) + " " + "Semester " + String(module.study_semester[i].semesterNumbers[j])
            study_semester_dict[semester_name] = []
        }
        for (let j = 0; j < module.study_semester[i].content.length; j++) {
            const semester_name = String(module.study_semester[i].studyCourse.name) + " " + String(module.study_semester[i].content[j])
            study_semester_dict[semester_name] = []
        }
    }

    // console.log("FILLED DOZENT DICT", dozent_dict)
    console.log("EMPTY STUDYSEMESTER DICT", study_semester_dict)

    //FILL THE DICTIONARIES WITH ALL MODULES WITH THE SAME VALUE
    //for each module in module list
    for (const currentModule of module_list) {
        // console.log(currentModule.study_semester)
        updateDictionary(dozent_dict, currentModule, module, 'dozent');
        updateDictionary(room_dict, currentModule, module, 'room');
        // updateDictionary(study_semester_dict, currentModule, module, 'study_semester');
        if (currentModule !== module) {
            for (const studySemester of currentModule.study_semester) {
                console.log("NEXT SEMESTER", currentModule)
                for (let j = 0; j < studySemester.semesterNumbers.length; j++) {
                    const semester_name = String(studySemester.studyCourse.name) + " " + "Semester " + String(studySemester.semesterNumbers[j])
                    console.log(semester_name)
                    for (const [key, value] of Object.entries(study_semester_dict)) {
                        if (semester_name == key) {
                            value.push(currentModule)
                        }
                    }
                }
                for (let j = 0; j < studySemester.content.length; j++) {
                    const semester_name = String(studySemester.studyCourse.name) + " " + String(studySemester.content[j])
                    for (const [key, value] of Object.entries(study_semester_dict)) {
                        if (semester_name == key) {
                            value.push(currentModule)
                        }
                    }
                }
            }
        }
    }
    // console.log("FILLED DOZENT DICT", dozent_dict)
    console.log("FILLED STUDYSEMESTER DICT", study_semester_dict)


    //DELETE ALL CONFLICTS WITH THE CURRENT MODULE
    for (let i = 0; i < conflict_list.length; i++) {
        if(conflict_list[i].mod1._id == module._id || conflict_list[i].mod2._id == module._id){
            conflict_list.splice(i, 1);
            i--;
        }
    }

    //CREATE NEW CONFLICTS WITH THE DICTIONARIES
    for (const [key, value] of Object.entries(dozent_dict)) {
        for (let i = 0; i < value.length; i++) {
            if(overlap(module, value[i])) {
                // if(module.type === "Modul" && value[i].type === "Modul") {
                //     conflict_list.push(new Conflict(module, value[i], key, 1))
                // } else if((module.type === "Modul" && value[i].type === "Abwesenheit") || (module.type === "Abwesenheit" && value[i].type === "Modul")) {
                //     conflict_list.push(new Conflict(module, value[i], key, 2))
                // }
                conflict_list.push(new Conflict(module, value[i], getConflictName(module, key, "dozent"), 1))
            }
        }
    }
    for (const [key, value] of Object.entries(room_dict)) {
        for (let i = 0; i < value.length; i++) {
            if(overlap(module, value[i])) {
                conflict_list.push(new Conflict(module, value[i], getConflictName(module, key, "room"), 6))
            }
        }
    }
    for (const [key, value] of Object.entries(study_semester_dict)) {
        const prevValue = getNewSemester(getConflictName(module, key, "study_semester"), false)
        const nextValue = getNewSemester(getConflictName(module, key, "study_semester"), true)
        console.log("PREV",prevValue)
        var prevList = []
        var nextList = []
        for (let i = 0; i < module_list.length; i++) {
            //for each studySemester in module
            for (let j = 0; j < module_list[i].study_semester.length; j++) {
                for (let k = 0; k < module_list[i].study_semester[j].semesterNumbers.length; k++) {
                    const semester_name = String(module_list[i].study_semester[j].studyCourse.name) + " " + "Semester " + String(module_list[i].study_semester[j].semesterNumbers[k])
                    if (semester_name == prevValue) {
                        if(module_list[i] != module) {
                            prevList.push(module_list[i])
                        }
                    } else if (semester_name == nextValue) {
                        if(module_list[i] != module) {
                            nextList.push(module_list[i])
                        }
                    }
                }
                for (let k = 0; k < module_list[i].study_semester[j].semesterNumbers.length; k++) {
                    const semester_name = String(module_list[i].study_semester[j].studyCourse.name) + " " + String(module_list[i].study_semester[j].content[k])
                    if (semester_name == prevValue) {
                        if(module_list[i] != module) {
                            prevList.push(module_list[i])
                        }
                    } else if (semester_name == nextValue) {
                        if(module_list[i] != module) {
                            nextList.push(module_list[i])
                        }
                    }
                }
            }
        }
        console.log("PREV",prevList)
        console.log("NEXT",nextList)
        for (let i = 0; i < value.length; i++) {
            if(overlap(module, value[i])) {
                conflict_list.push(new Conflict(module, value[i], getConflictName(module, key, "study_semester"), 3))  
            }
        }
        for (let i = 0; i < prevList.length; i++) {
            if(overlap(module, prevList[i])) {
                    conflict_list.push(new Conflict(module, prevList[i], getConflictName(module, key, "study_semester"), 5, getNewSemester(getConflictName(module, key, "study_semester"), false)))  
            }
        }
        for (let i = 0; i < nextList.length; i++) {
            if(overlap(module, nextList[i])) {
                    conflict_list.push(new Conflict(module, nextList[i], getConflictName(module, key, "study_semester"), 5, getNewSemester(getConflictName(module, key, "study_semester"), true)))  
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
                console.log("DAY_MODULE_LIST:",dayModuleList)
                conflict_list.push(new Conflict(module, dayModuleList[0], getConflictName(module, key, "study_semester"), 7))
            }
        }
    }

    //4 KONFLIKTE IN DER KONSOLE AUSGEBEN
    // for (let i = 0; i < conflict_list.length; i++) {
    //     conflict_list[i].printError()
    // }
    return conflict_list
}

export {checkModuleWarnings, deleteConflictsWithCurrentModule}