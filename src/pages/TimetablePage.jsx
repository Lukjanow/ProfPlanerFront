import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import moment from 'moment';
import { useTranslation } from "react-i18next";
import "moment/locale/de";
import { TimeTable } from "../components/TimeTable";
import { getModulesByFrequency } from "../services/moduleService";
import { getAllCalendars, getCalendarById, getCalendarEntriesForCalendar } from "../services/calendarService";
import PageContainer from "../components/PageContainer";
import { useTimeTableFilterStore } from "../stores/timeTableFilterStore.js";
import { parseEvent } from "../utils/calendarEventUtils.js";
import { useselectedTimetableStore } from "../stores/selectedTimetableStore.js";


export default function MyCalendar() {
  moment.locale("de");
  const { t } = useTranslation();
  const [modules, setModules] = useState(null);
  const [timeTableName, settimeTableName] = useState("")
  const [calendarEntries, setcalendarEntries] = useState(null);
  const setCurrentCalendar = useTimeTableFilterStore(state => state.setCurrentCalendar);
  const settimeTableID = useselectedTimetableStore(state => state.settimeTableID);


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
    const durationHours = Math.floor(duration / 60)
    const durationMinutes = duration % 60
    var endMinutes = startMinutes + durationMinutes
    var endHours = startHours + durationHours
    if (endMinutes >= 60) {
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
        const eventEnd = getEventEnd(eventStart, moduleCalendarEntry.module.duration)
        list.push(parseEvent(moduleCalendarEntry, module_list[i], eventStart, eventEnd, false))
      } else {
        //Module selbst erstellen und isPlaced=false
        // const all_study_semester_string = getAllStudySemesterString(module_list[i].study_semester)
        list.push(parseEvent(null, module_list[i], moment("2024-01-01T12:00").toDate(), moment("2024-01-01T15:00").toDate(), false))
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
          if (calendarList.data[i].last_opening > opening) {
            opening = calendarList.data[i].last_opening
            calendarId = calendarList.data[i]._id
            frequency = calendarList.data[i].frequency
            settimeTableName(calendarList.data[i].name)
          }

        }

        if (calendarId != null) {
          const module_result = await getModulesByFrequency(frequency);
          setModules(module_result.data);

          settimeTableID(calendarId)
          const calendarRes = await getCalendarById(calendarId);
          setCurrentCalendar(calendarRes.data);

          const calendarEntry_result = await getCalendarEntriesForCalendar(calendarId);
          setcalendarEntries(calendarEntry_result.data);
        }
      } catch (error) {
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
