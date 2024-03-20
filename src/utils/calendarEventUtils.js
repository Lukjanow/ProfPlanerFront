import moment from 'moment';


export function getEventStart(time_stamp) {
      var start = moment("2024-01-01T12:00").toDate()
      start.setDate(time_stamp.week_day)
      start.setHours(time_stamp.hour)
      start.setMinutes(time_stamp.minute)
      return start
    }

export function getEventEnd(start, duration) {
      const startHours = start.getHours()
      const startMinutes = start.getMinutes()
      const durationHours = Math.floor(duration/60)
      const durationMinutes = duration % 60
      var endMinutes = startMinutes + durationMinutes
      var endHours = startHours + durationHours
      if(endMinutes >= 60){
        endHours += 1
        endMinutes -= 60
      }
      var end = moment("2024-01-01T12:00").toDate()
      end.setDate(start.getDay())
      end.setHours(endHours)
      end.setMinutes(endMinutes)
      return end
    }

export function parseEvent(moduleCalendarEntry, module, start, end){
        var event = {
            _id: module._id,
            name: module.name,
            start: start,
            end: end,
            study_semester_string: module.study_semester[0] != null? getEveryStudySemesterString(module.study_semester)[0] : "Kein Semester",
            hover_study_semester_string: module.study_semester[0] != null? listToString(getEveryStudySemesterString(module.study_semester)) : "Kein Semester",
            study_semester: module.study_semester,
            dozent_string: module.dozent[0] !== null && module.dozent[0] !== undefined ? String(module.dozent[0].prename) + " " + String(module.dozent[0].lastname) : "Kein Dozent",
            hover_dozent_string: module.dozent[0] !== null && module.dozent[0] !== undefined ? getAllDozentString(module.dozent) : "Kein Dozent",
            dozent: module.dozent,
            room_string: module.room[0] !== null && module.room[0] !== undefined ? String(module.room[0].roomNumber) : "kein Raum",
            hover_room_string: module.room[0] !== null && module.room[0] !== undefined ? getAllRoomString(module.room) : "kein Raum",
            room: module.room,
            backgroundcolor: module.color !== null && module.color !== undefined ? module.color : "#eeeeee",
            bordercolor: module.color !== null && module.color !== undefined ? changeColor(module.color, -40) : "#bcbcbc",
            duration: module.duration,
            visible: true,
            isPlaced: moduleCalendarEntry === null ? false : true,
            calendar_entry_id: moduleCalendarEntry === null ? -1 : moduleCalendarEntry._id
          }
    return event
}

export function changeColor(col, amt) {
      var usePound = false;
    
      if (col[0] == "#") {
          col = col.slice(1);
          usePound = true;
      }
  
      var num = parseInt(col,16);
      var r = (num >> 16) + amt;
  
      if (r > 255) r = 255;
      else if  (r < 0) r = 0;
  
      var b = ((num >> 8) & 0x00FF) + amt;
  
      if (b > 255) b = 255;
      else if  (b < 0) b = 0;
  
      var g = (num & 0x0000FF) + amt;
  
      if (g > 255) g = 255;
      else if (g < 0) g = 0;
  
      return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  }

  function getAllStudySemesterString(study_semester) {
      var all_study_semester_string = String(study_semester[0].name)
      for (let i = 1; i < study_semester.length; i++) {
        all_study_semester_string = all_study_semester_string + ", " + String(study_semester[i].name)
      }
      return all_study_semester_string
    }

    function getAllRoomString(room) {
      var all_room_string = String(room[0].roomNumber)
      for (let i = 1; i < room.length; i++) {
        all_room_string = all_room_string + ", " + String(room[i].roomNumber)
      }
      return all_room_string
    }

    function getAllDozentString(dozent) {
      var all_dozent_string = String(dozent[0].prename) + " " + String(dozent[0].lastname)
      for (let i = 1; i < dozent.length; i++) {
        all_dozent_string = all_dozent_string + ", " + String(dozent[i].prename) + " " + String(dozent[i].lastname)
      }
      return all_dozent_string
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

    function listToString(list) {
      var list_string = list[0]
      for (let i = 1; i < list.length; i++) {
        list_string = list_string + ", " + list[i];
      }
      return list_string
    }
