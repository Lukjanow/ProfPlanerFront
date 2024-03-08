

function filterDozent(dropdownInput, module_list){
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
}
function filterRoom(dropdownInput, module_list){
    for (const module of module_list) {
        var visible = false
        for(const room of module.room){
            const room_name = String(room.name)
            if (room_name == dropdownInput) {
                visible = true
                break;
            }
        }
        module.visible = visible
    }
}
function filterStudySemester(dropdownInput, module_list){
    for (const module of module_list) {
        var visible = false
        for(const study_semester of module.study_semester){
            const study_semester_name = String(study_semester.name)
            if (study_semester_name == dropdownInput) {
                visible = true
                break;
            }
        }
        module.visible = visible
    }
}

export{filterDozent, filterRoom, filterStudySemester}