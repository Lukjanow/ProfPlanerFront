//
const mod1_name = "EINF"
const mod1_start = 15 * 60
const mod1_duration = 195

const mod2_name = "SMK"
const mod2_start = 18 * 60
const mod2_duration = 195

//function to prove if two modules are overlaping
//returns boolean value (true = do overlap, false = do not overlap)
function overlap(mod1, mod2, optional_break=0){
    if(mod1.start + mod1.duration + optional_break > mod2.start) {
        return true
    }
    if(mod2.start + mod2.duration + optional_break > mod1.start){
        return true
    }
    return false
}