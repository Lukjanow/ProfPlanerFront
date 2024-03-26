import { useEffect, useState } from "react";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import moment from 'moment';
import { useTranslation } from "react-i18next";
import "moment/locale/de";
import { TimeTable } from "../components/TimeTable";
import { getAllModules, getModulesByFrequency } from "../services/moduleService";
import { getAllCalendars, getCalendarById, getCalendarEntriesForCalendar } from "../services/calendarService";
import PageContainer from "../components/PageContainer";
import { getAllStudySemesters } from "../services/studySemesterService";
import {useTimeTableFilterStore} from "../stores/timeTableFilterStore.js";
import { parseEvent } from "../utils/calendarEventUtils.js";
import { useselectedTimetableStore } from "../stores/selectedTimetableStore.js";


export default function MyCalendar() {
  moment.locale("de");
  const localizer = momentLocalizer(moment);
  const { t } = useTranslation();
  const [modules, setModules] = useState(null);
  const [timeTableName, settimeTableName] = useState("")
  const [calendarEntries, setcalendarEntries] = useState(null);
  const setCurrentCalendar = useTimeTableFilterStore(state => state.setCurrentCalendar);
  const timeTableID = useselectedTimetableStore(state => state.timeTableID);
  const settimeTableID = useselectedTimetableStore(state => state.settimeTableID);

    /* const moduleItemDataList = [
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
    ]; */

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

  function initModules(module_list, calendarEntry_list) {
    var list = []

    for (let i = 0; i < module_list.length; i++) {
      var hasCalendarEntry = false
      var moduleCalendarEntry = null
      for (const calendarEntry of calendarEntry_list) {
        if (calendarEntry.module._id == module_list[i]._id) {
          moduleCalendarEntry = calendarEntry
          hasCalendarEntry = true
        }
      }

        if (hasCalendarEntry) {
          //Module mithilfe des CalendarEntrys erstellen und isPlaced=true
          const eventStart = getEventStart(moduleCalendarEntry.time_stamp)
          const eventEnd = getEventEnd(eventStart,moduleCalendarEntry.module.duration)
          list.push(parseEvent(moduleCalendarEntry, module_list[i], eventStart, eventEnd, false))
        } else{
          //Module selbst erstellen und isPlaced=false
          // const all_study_semester_string = getAllStudySemesterString(module_list[i].study_semester)
          list.push(parseEvent(null, module_list[i],moment("2024-01-01T12:00").toDate(),moment("2024-01-01T15:00").toDate(), false))
        }
      }
      return list
    }

  useEffect(() => {
    async function fetchData() {
      try {
        const calendarList = await getAllCalendars();

        var calendarId = null
        var opening = 0
        var frequency = 0

        for (let i = 0; i < calendarList.data.length; i++) {
          if(calendarList.data[i].last_opening > opening){
            opening = calendarList.data[i].last_opening
            calendarId = calendarList.data[i]._id
            frequency = calendarList.data[i].frequency
            settimeTableName(calendarList.data[i].name)
          }
          
        }

        if(calendarId != null){
          const module_result = await getModulesByFrequency(frequency);
          setModules(module_result.data);

          settimeTableID(calendarId)
          const calendarRes = await getCalendarById(calendarId);
          setCurrentCalendar(calendarRes.data);

          const calendarEntry_result = await getCalendarEntriesForCalendar(calendarId);
          setcalendarEntries(calendarEntry_result.data);
        }
        } catch(error) {
          console.log("Error: ", error);
        }
      }
      fetchData()
    }, []);

  return (
    <PageContainer
      title={t("scheduling") + ": " + timeTableName}
      showCancelButton={false}
      showPrimaryButton={false}
      showDeleteButton={false}
    >
      {// <div className="flex">
        //   <TimeTable moduleItemList={moduleItemDataList}/>
        // </div>
      }
      {calendarEntries !== null && modules !== null ?
        <div className="flex flex-col gap-5">
          <TimeTable moduleItemListPara={initModules(modules, calendarEntries)} />
        </div> : <TimeTable moduleItemListPara={[]} />
      }
    </PageContainer>
  );
}
