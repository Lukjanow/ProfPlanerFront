//

//function to prove if two modules are overlaping
//returns boolean value (true = do overlap, false = do not overlap)
function overlap(mod1, mod2, optional_break=0){
    if(mod1.start + mod1.duration + optional_break > mod2.start && mod2.start + mod2.duration + optional_break > mod1.start) {
        return true
    }
    return false
}
const mod1 = {
    start: 15 * 60,
    duration: 195,
}
const mod2 = {
    start: 10 * 60,
    duration: 195,
}
console.log("Hello World")
console.log(overlap(mod1,mod2))

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