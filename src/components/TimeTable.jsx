import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useState, useEffect } from "react";
import { ModuleItem } from "./ModuleItem";
import { ModuleBar } from "./ModuleBar";
import { ConflictDisplay } from "./ConflictDisplay";
import { PageTitle } from "../components/PageTitle";
import { TimeTableFilter } from "../components/TimeTableFilter";
import "../styles/components/timeTableEvent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisclosure } from "@nextui-org/react";
import { ModuleInfo } from './ModuleInfo';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment/dist/moment';
import 'moment/dist/locale/de';
import { Tooltip } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { checkModuleWarnings, deleteConflictsWithCurrentModule } from "../conflicts/conflicts";
import { updateCalendarEntry, addCalendarEntryForCalendar, deleteCalendarEntry } from "../services/calendarService";
import { SectionContainer } from "./SectionContainer";

export function TimeTable({ moduleItemListPara }) {
  const { i18n } = useTranslation();

  if (i18n.language === "en") {
    moment.locale("en", { week: { dow: 1 } })
  } else if (i18n.language === "de") {
    moment.locale("de")
  }

  const localizer = momentLocalizer(moment)

  const DnDCalendar = withDragAndDrop(Calendar);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalEvent, setModalEvent] = useState('');

  // State für Termine und außerhalb des Kalenders gezogene Ereignisse
  const [moduleItemList, setmoduleItemList] = useState(moduleItemListPara);
  const [events, setEvents] = useState(filterForEvents());
  const [conflict_list, setConflicts] = useState([]);
  const [draggedEvent, setDraggedEvent] = useState(null);

  function getTimeStamp(moment) {
    const timeStampDict = {
      week_day: moment.getDay(),
      hour: moment.getHours(),
      minute: moment.getMinutes(),
    }
    return timeStampDict
  }


  function updateModuleCalendarEntry(module) {
    updateCalendarEntry(module.calendar_entry_id, { moduleId: module._id, timeStampModel: getTimeStamp(module.start), comment: null })
  }

  async function addModuleCalendarEntry(module) {
    const data = await addCalendarEntryForCalendar("65d61765c15324dcfc497c4f", { module: module._id, time_stamp: getTimeStamp(module.start), comment: null })
    module.calendar_entry_id = data.data._id
  }

  function deleteModuleCalendarEntry(module) {
    deleteCalendarEntry(module.calendar_entry_id)
  }




  function filterForEvents() {
    if (moduleItemList === undefined) {
      return []
    }
    return moduleItemList.filter(e => e.isPlaced === true && e.visible === true)
  }

  function filterForOutside() {
    if (moduleItemList === undefined) {
      return []
    }
    return moduleItemList.filter(e => e.isPlaced === false && e.visible === true)
  }

  function filterForConflict() {
    return moduleItemList.filter(e => e.isPlaced === true)
  }

  function updateModule(event) {
    const newList = []
    for (let i = 0; i < moduleItemList.length; i++) {
      if (moduleItemList[i]._id === event._id) {
        moduleItemList[i] = event
      }
      newList.push(moduleItemList[i])
    }
    setmoduleItemList(newList)
  }

  function moduleSetOutside(event) {
    const newList = []
    for (let i = 0; i < moduleItemList.length; i++) {
      if (moduleItemList[i]._id === event._id) {
        moduleItemList[i].isPlaced = false
      }
      newList.push(moduleItemList[i])
    }
    setmoduleItemList(newList)
  }

  // Callback für das Ablegen von außerhalb des Kalenders gezogenen Ereignissen
  const onDropFromOutside = useCallback(
    ({ start, end }) => {
      console.log("Außerhalb des Kalenders abgelegt:", draggedEvent.name, start, end);
      if (draggedEvent) {
        const newEvent = {
          ...draggedEvent,
          start,
          end: moment(start).add(draggedEvent.duration, 'minutes'),
          _id: draggedEvent._id,
          isPlaced: true
        };
        updateModule(newEvent)
        addModuleCalendarEntry(newEvent)
        setEvents(filterForEvents())
        setDraggedEvent(null)
        setConflicts(checkModuleWarnings(filterForConflict(), conflict_list, newEvent))
        console.log("EVENTS: ", events)
        // console.log("conflict_list")
        // console.log(conflict_list)
      }

    },
    [draggedEvent]
  );

  // Callback zum Aktualisieren der Terminzeit
  const onChangeEventTime = useCallback(
    (start, end, appointmentId) => {
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event._id === appointmentId ? { ...event, start, end } : event
        )
      );
      var div = document.getElementById("removeBorder")
      div.classList.remove("bg-red-600")
      div.classList.add("bg-white")

      let module = null;
      for (let i = 0; i < events.length; i++) {
        if (events[i]._id === appointmentId) {
          module = events[i];
          break;
        }
      }
      module.start = start
      module.end = end

      updateModule(module)
      updateModuleCalendarEntry(module)
      setConflicts(checkModuleWarnings(filterForConflict(), conflict_list, module))
      console.log("conflict_list")
      console.log(conflict_list)
    },
  );

  const eventStyleGetter = (event) => {
    let newStyle = {};

    newStyle["backgroundColor"] = event.backgroundcolor
    newStyle["borderColor"] = event.bordercolor
    newStyle["color"] = "#000000"
    newStyle["borderInlineStartWidth"] = "8px"
    newStyle["visibility"] = event.visible ? "visible" : "hidden"

    return {
      style: newStyle
    };
  };

  function formatTime(startHours, startMinutes, endHours, endMinutes) {

    if (i18n.language === "de") {
      return (
        <p className="font-semibold">
          {startHours + ":"}
          {fixZeros(startMinutes) + " - "}
          {endHours + ":"}
          {fixZeros(endMinutes) + " Uhr"}
        </p>
      )
    }
    var start = startHours + ":" + fixZeros(startMinutes) + " am - "
    var end = endHours + ":" + fixZeros(endMinutes) + " am"

    if (startHours > 12) {
      startHours = startHours - 12
      start = startHours + ":" + fixZeros(startMinutes) + " pm - "
    }
    if (endHours > 12) {
      endHours = endHours - 12
      end = endHours + ":" + fixZeros(endMinutes) + " pm"
    }

    return (
      <p className="font-semibold">
        {start}
        {end}
      </p>
    )
  }

  function setTime(start, duration) {
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

    return (
      formatTime(startHours, startMinutes, endHours, endMinutes)
    )
  }

  function fixZeros(num) {
    return (num < 10 ? "0" : "") + num;
  }

  function handleRightClick(event, click) {
    setModalEvent(event)
    click.preventDefault();
    onOpen()
  }

  const handleClickRemoveEvent = () => {
    moduleSetOutside(modalEvent)
    setEvents(filterForEvents())
    deleteModuleCalendarEntry(modalEvent)
    setConflicts(deleteConflictsWithCurrentModule(conflict_list, modalEvent))
  };


  const eventContent = (event) => {
    return (
      <div hidden={!event.visible} className="w-[13vw] rounded-e-md p-3 h-full space-y-1">
        <p className="font-semibold">{event.name}</p>
        {setTime(event.start, event.duration)}
        <div className="flex flex-col space-y-1 hidden">
          <div className="flex detail-semester">
            <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-graduation-cap" /></span><span>{event.study_semester_string}</span>
          </div>
          <div className="flex detail-dozent">
            <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-user" /></span><span>{event.dozent_string}</span>
          </div>
          <div className="flex detail-room">
            <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-location-dot" /></span><span>{event.room_string}</span>
          </div>
        </div>
      </div>
    )
  }

  const hoverEventContent = (event) => {
    return (
      <div hidden={!event.visible} className="w-[13vw] rounded-e-md w-full p-3 h-full space-y-1">
        <p className="font-semibold">{event.name}</p>
        {setTime(event.start, event.duration)}
        <div className="flex">
          <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-graduation-cap" /></span><span>{event.hover_study_semester_string}</span>
        </div>
        <div className="flex">
          <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-user" /></span><span>{event.hover_dozent_string}</span>
        </div>
        <div className="flex">
          <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-location-dot" /></span><span>{event.hover_room_string}</span>
        </div>
      </div>
    )
  }

  const customEvent = ({ event }) => {
    return (
      <Tooltip
        key={event._id}
        placement={"right"}
        content={hoverEventContent(event)}
        closeDelay={0}
        color="foreground"
        isDisabled={moveEvent !== null ? true : false}
      >
        <div className="h-full" id={event._id} data-user={event} onContextMenu={(click) => handleRightClick(event, click)}>
          {eventContent(event)}
        </div>
      </Tooltip>
    )
  }

  var moveEvent = null

  const handleMouseLeave = () => {
    if (moveEvent == null) {
      return
    }
    moduleSetOutside(moveEvent)
    setEvents(filterForEvents())
    deleteModuleCalendarEntry(moveEvent)
    setConflicts(deleteConflictsWithCurrentModule(conflict_list, moveEvent))
    var div = document.getElementById("removeBorder")
    div.classList.remove("bg-red-600")
    div.classList.add("bg-white")
  };

  const handleDragStart = (event) => {
    moveEvent = event.event

    var div = document.getElementById("removeBorder")
    div.classList.add("bg-red-600")
    div.classList.remove("bg-white")
  };

  const handleMouseUp = () => {
    moveEvent = null
    var div = document.getElementById("removeBorder")
    div.classList.remove("bg-red-600")
    div.classList.add("bg-white")
  }

  const filterAction = () => {
    console.log("FILTER")
    setEvents(filterForEvents())
  }

  function initConflicts() {
    const module_list = filterForConflict()
    for (const module of module_list) {
      setConflicts(checkModuleWarnings(filterForConflict(), conflict_list, module))
    }
  }

  function hideSundayInTimetable() {
    const lastHeader = document.querySelector(".rbc-calendar .rbc-time-header > .rbc-time-header-content .rbc-header:last-of-type");
    const lastColumn = document.querySelector(".rbc-calendar .rbc-time-content > .rbc-day-slot.rbc-time-column:last-of-type");
    lastHeader?.classList.add("hiddenImportant");
    lastColumn?.classList.add("hiddenImportant");
  }

  useEffect(() => {
    initConflicts();
    hideSundayInTimetable();
  });

  return (
    <>
      <div className="flex">
        <div>
          <TimeTableFilter module_list={moduleItemList} filterAction={filterAction}></TimeTableFilter>
          <div>
            <ModuleInfo isOpen={isOpen} onOpenChange={onOpenChange} event={modalEvent} removeFunction={handleClickRemoveEvent} />
            <SectionContainer className={"p-0"}>
              <div id="removeBorder" onMouseLeave={handleMouseLeave} className="p-4" onMouseUp={handleMouseUp}>
                <DnDCalendar
                  className="w-[78vw] select-none"
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  views={["week"]}
                  defaultView="week"
                  min={moment("2024-01-01T08:30").toDate()}
                  max={moment("2024-01-01T20:00").toDate()}
                  defaultDate={moment("2024-01-01T00:00").toDate()}
                  toolbar={false}
                  eventPropGetter={eventStyleGetter}
                  step={15}
                  components={{
                    event: customEvent
                  }}
                  timeslots={2}
                  selectable
                  resizable={false}
                  formats={{ dayFormat: (date, culture, localizer) => localizer.format(date, "dddd", culture) }}
                  onEventDrop={({ start, end, event }) => { onChangeEventTime(start, end, event._id) }}
                  onDropFromOutside={onDropFromOutside}
                  drilldownView={null}
                  onDragStart={(event) => handleDragStart(event)}
                />
              </div>
            </SectionContainer>
            <ConflictDisplay data={conflict_list} />
          </div>
        </div>
        <div>
          <ModuleBar moduleItemList={filterForOutside().map(event => (
            <ModuleItem key={event._id} moduleItemData={event} dragEvent={setDraggedEvent} />
          ))} />
        </div>
      </div>
    </>
  );
}
