import { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import moment from 'moment';
import {ModuleBar} from "../components/ModuleBar"
import "moment/locale/de";
import {TimeTableFilter} from "../components/TimeTableFilter";
import { ModuleItem } from "../components/ModuleItem";
import { TimeTable } from "../components/TimeTable";
import { PageTitle } from "../components/PageTitle";
import { getAllModules } from "../services/moduleService";
import { getCalendarEntriesForCalendar } from "../services/calendarService";

moment.locale("de");
const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  const [modules, setModules] = useState([]);
  const [calendarEntries, setcalendarEntries] = useState([]);

    const moduleItemDataList = [
      {
        _id: "65d70a20bd82b03aeac92a56",
        name: "Einführung in die Informatik",
        type: "Modul",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: ["AI-B 1"],
        dozent: ["Herbert Thielen"],
        room: ["B200"],
        backgroundcolor: "#D6F5E2",
        bordercolor: "#46D27F",
        duration: 195,
      },
      {
        _id: "65d70acbbd82b03aeac92a5c",
        name: "Rechnernetze und Netzwerksicherheit",
        type: "Modul",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: ["AI-B 2", "WI-B 4"],
        dozent: ["Herbert Thielen"],
        room: ["A200"],
        backgroundcolor: "#d5a6bd",
        bordercolor: "#d32e7f",
        duration: 195,
      },
      {
        _id: "65d71e619004f2a19971f8bd",
        name: "Betriebssysteme",
        type: "Modul",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: ["AI-B 2"],
        dozent: ["Jens Kohler"],
        room: ["D137"],
        backgroundcolor: "#ca9966",
        bordercolor: "#6f4316",
        duration: 195,
      },
      {
        _id: "65d738b5a421a928cd955b63",
        name: "Softwarequalität",
        type: "Modul",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: ["AI-B 3"],
        dozent: ["Herbert Thielen"],
        room: ["N37"],
        backgroundcolor: "#a2c4c9",
        bordercolor: "#106875",
        duration: 195,
      },
      {
      id: 5,
      name: "Datenbanken",
      type: "Modul",
      start: moment("2024-01-01T12:00").toDate(),
      end: moment("2024-01-01T15:00").toDate(),
      studySemester: ["AI-B 2"],
      dozent: ["Norman Riegel"],
      room: ["D138"],
      backgroundcolor: "#36abad",
      bordercolor: "#1b8f90",
      duration: 195,
    },
    {
      id: 6,
      name: "Fullstack Webanwendungen",
      type: "Modul",
      start: moment("2024-01-02T14:00").toDate(),
      end: moment("2024-01-02T18:00").toDate(),
      studySemester: ["AI-B 4"],
      dozent: ["Jens Kohler"],
      room: ["A200"],
      backgroundcolor: "#ea9999",
      bordercolor: "#e70000",
      duration: 195,
    },
    {
      id: 7,
      name: "Katze Streicheln",
      type: "Abwesenheit",
      start: moment("2024-01-01T12:00").toDate(),
      end: moment("2024-01-01T15:00").toDate(),
      studySemester: [],
      dozent: ["Herbert Thielen"],
      room: [],
      backgroundcolor: "#a2c4c9",
      bordercolor: "#106875",
      duration: 300,
    },
    ];

    function getEventStart(time_stamp) {
      var start = moment("2024-01-01T12:00").toDate()
      start.setDate(time_stamp.week_day)
      start.setHours(time_stamp.hour)
      start.setMinutes(time_stamp.minute)
      return start
    }

    function getEventEnd(start, duration) {
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

    function initModules(module_list, calendarEntry_list){
      var list = []

      for (let i = 0; i < module_list.length; i++) {
        var hasCalendarEntry = false
        var moduleCalendarEntry = null
        for(const calendarEntry of calendarEntry_list){
          if(calendarEntry.module._id == module_list[i]._id){
            moduleCalendarEntry = calendarEntry
            hasCalendarEntry = true
          }
        }

        if (hasCalendarEntry) {
          //Module mithilfe des CalendarEntrys erstellen und isPlaced=true
          const eventStart = getEventStart(moduleCalendarEntry.time_stamp)
          const eventEnd = getEventEnd(eventStart,moduleCalendarEntry.module.duration)
          list.push({
            _id: module_list[i]._id,
            name: module_list[i].name,
            type: "Type",
            start: eventStart,
            end: eventEnd,
            study_semester_string: module_list[i].study_semester[0] != null? String(module_list[i].study_semester[0].name) : "Kein Semester",
            study_semester: module_list[i].study_semester,
            dozent_string: module_list[i].dozent[0] !== null && module_list[i].dozent[0] !== undefined ? String(module_list[i].dozent[0].prename) + " " + String(module_list[i].dozent[0].lastname) : "Kein Dozent",
            dozent: module_list[i].dozent,
            room_string: module_list[i].room[0] !== null && module_list[i].room[0] !== undefined ? String(module_list[i].room[0].name) : "kein Raum",
            room: module_list[i].room,
            backgroundcolor: module_list[i].color !== null && module_list[i].color !== undefined ? module_list[i].color : "#eeeeee",
            bordercolor: module_list[i].color !== null && module_list[i].color !== undefined ? changeColor(module_list[i].color, -40) : "#bcbcbc",
            duration: module_list[i].duration,
            visible: true,
            isPlaced: true,
          })
        } else{
          //Module selbst erstellen und isPlaced=false
          list.push({
            _id: module_list[i]._id,
            name: module_list[i].name,
            type: "Type",
            start: moment("2024-01-01T12:00").toDate(),
            end: moment("2024-01-01T15:00").toDate(),
            study_semester_string: module_list[i].study_semester[0] != null? String(module_list[i].study_semester[0].name) : "Kein Semester",
            study_semester: module_list[i].study_semester,
            dozent_string: module_list[i].dozent[0] !== null && module_list[i].dozent[0] !== undefined ? String(module_list[i].dozent[0].prename) + " " + String(module_list[i].dozent[0].lastname) : "Kein Dozent",
            dozent: module_list[i].dozent,
            room_string: module_list[i].room[0] !== null && module_list[i].room[0] !== undefined ? String(module_list[i].room[0].name) : "kein Raum",
            room: module_list[i].room,
            backgroundcolor: module_list[i].color !== null && module_list[i].color !== undefined ? module_list[i].color : "#eeeeee",
            bordercolor: module_list[i].color !== null && module_list[i].color !== undefined ? changeColor(module_list[i].color, -40) : "#bcbcbc",
            duration: module_list[i].duration,
            visible: true,
            isPlaced: false,
          })
        }
      }
      return list
    }

    function changeColor(col, amt) {
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

    useEffect(() => {
      async function fetchData() {
        try {
          const module_result = await getAllModules();
          setModules(module_result.data);
          const calendarEntry_result = await getCalendarEntriesForCalendar("65d61765c15324dcfc497c4f");
          setcalendarEntries(calendarEntry_result.data);
          console.log("CalendarEntry: ", calendarEntry_result)
        } catch(error) {
          console.log("Error: ", error);
        }
      }
      fetchData()
    }, []);

    return (
        // <div className="flex">
        //   <TimeTable moduleItemList={moduleItemDataList}/>
        // </div>
        <>
        { modules.length !== 0 && calendarEntries.length !== 0 ?
            <div className="flex">
                <TimeTable moduleItemListPara={initModules(modules, calendarEntries)}/>
            </div> : <TimeTable moduleItemListPara={[]}/>
        }
        </>
    );
}
