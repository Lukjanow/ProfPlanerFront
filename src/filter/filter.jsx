
function filterDozent(dropdownInput, module_list){
    if (dropdownInput) {
        for (const module of module_list) {
            var visible = false
            for(const dozent of module.dozent){
                const dozent_full_name = String(dozent.prename) + " " + String(dozent.lastname)
                if (dozent_full_name == dropdownInput) {
                    visible = true
                    break;
                }
            }
            module.visible = visible
        }
    } else {
        for(const module of module_list){
            module.visible = true
        }
    }
}

function filterRoom(dropdownInput, module_list){
    if(dropdownInput){
        for (const module of module_list) {
            var visible = false
            for(const room of module.room){
                const room_name = String(room.roomNumber)
                if (room_name == dropdownInput) {
                    visible = true
                    break;
                }
            }
            module.visible = visible
        }
    } else {
        for(const module of module_list){
            module.visible = true
        }
    }
}

function getEveryStudySemesterString(studySemesters, seperator=" ") {
    var string_list = []
    for (const studySemester of studySemesters) {
      for (const semester of studySemester.semesterNumbers) {
        string_list.push(String(studySemester.studyCourse.name) + seperator + "Semester " + String(semester))
      }
      for (const content of studySemester.content) {
        string_list.push(String(studySemester.studyCourse.name) + seperator + String(content))
      }
    }
    return string_list
  }

function filterStudySemester(dropdownInput, module_list){
    if(dropdownInput){
        for (const module of module_list) {
            var visible = false
            console.log("MODULE:", module)
            const semester_list = getEveryStudySemesterString(module.study_semester)
            console.log("SEMESTER:",semester_list)
            for(const study_semester of semester_list){
                if (study_semester == dropdownInput) {
                    visible = true
                    break;
                }
            }
            module.visible = visible
        }
    } else {
        for(const module of module_list){
            module.visible = true
        }
    }
}

export{filterDozent, filterRoom, filterStudySemester}