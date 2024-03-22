import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useState, useEffect, useContext } from "react";
import { ModuleItem } from "./ModuleItem";
import { ModuleBar } from "./ModuleBar";
import { ConflictDisplay } from "./ConflictDisplay";
import { TimeTableFilter } from "../components/TimeTableFilter";
import "../styles/components/timeTableEvent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollShadow, useDisclosure } from "@nextui-org/react";
import { ModuleInfo } from './ModuleInfo';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment/dist/moment';
import 'moment/dist/locale/de';
import { Tooltip } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { checkModuleWarnings, deleteConflictsWithCurrentModule } from "../conflicts/conflicts";
import { updateCalendarEntry, addCalendarEntryForCalendar, deleteCalendarEntry } from "../services/calendarService";
import { SectionContainer } from "./SectionContainer";
import { Context } from "../routes/root.jsx";
import { changeColor } from "../utils/calendarEventUtils.js";
import { useselectedTimetableStore } from "../stores/selectedTimetableStore.js";

export function TimeTable({ moduleItemListPara }) {
  const { t, i18n } = useTranslation();

  if (i18n.language === "en") {
    moment.locale("en", { week: { dow: 1 } })
  } else if (i18n.language === "de") {
    moment.locale("de")
  }

  const localizer = momentLocalizer(moment)

  const DnDCalendar = withDragAndDrop(Calendar);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalEvent, setModalEvent] = useState('');
  const [setSnackbarData] = useContext(Context)

  const timeTableID = useselectedTimetableStore(state => state.timeTableID);

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
    const data = await addCalendarEntryForCalendar(timeTableID, { module: module._id, time_stamp: getTimeStamp(module.start), comment: null })
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

  function updateEvents(event) {
    const newList = []
    for (let i = 0; i < moduleItemList.length; i++) {
      if (moduleItemList[i]._id === event._id) {
        moduleItemList[i] = event
      }
      newList.push(moduleItemList[i])
    }
    setEvents(filterForEvents(newList))
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

      let editModule = null;
      for (let i = 0; i < events.length; i++) {
        if (events[i]._id === appointmentId) {
          editModule = events[i];
          break;
        }
      }
      editModule.start = start
      editModule.end = end
      editModule.bordercolor = changeColor(editModule.backgroundcolor, -40)
      editModule.isAlgo = false

      updateModule(editModule)
      updateEvents(editModule)
      updateModuleCalendarEntry(editModule)
      setConflicts(checkModuleWarnings(filterForConflict(), conflict_list, editModule))
    },
  );

  const eventStyleGetter = (event) => {
    let newStyle = {};

    newStyle["backgroundColor"] = event.backgroundcolor
    newStyle["borderColor"] = event.bordercolor
    newStyle["color"] = "var(--nextui-primary)"
    newStyle["color"] = "#444444"
    newStyle["borderInlineStartWidth"] = "8px"
    newStyle["visibility"] = event.visible ? "visible" : "hidden"

    return {
      style: newStyle
    };
  };

  function formatTime(startHours, startMinutes, endHours, endMinutes) {

    if (i18n.language === "de") {
      return (
        <p className="font-bold">
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
      <p className="font-bold">
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
    modalEvent.bordercolor = changeColor(modalEvent.backgroundcolor, -40)
    modalEvent.isAlgo = false
    moduleSetOutside(modalEvent)
    setEvents(filterForEvents())
    deleteModuleCalendarEntry(modalEvent)
    setConflicts(deleteConflictsWithCurrentModule(conflict_list, modalEvent))
  };


  const eventContent = (event) => {
    return (
      <div hidden={!event.visible} className="rounded-e-md p-1 h-full flex flex-col gap-2">
        <div>
          <p className="font-bold text-xs">{event.name}</p>
          <p className="text-xs">{setTime(event.start, event.duration)}</p>
        </div>
        <ScrollShadow size={25} hideScrollBar={true} className="flex flex-col gap-[3px] text-xs">
          <div className="flex gap-2 items-center detail-semester">
            <FontAwesomeIcon className={"w-[15px]"} icon="graduation-cap" /><span>{event.study_semester_string}</span>
          </div>
          <div className="flex gap-2 items-center detail-dozent">
            <FontAwesomeIcon className={"w-[15px]"} icon="user" /><span>{event.dozent_string}</span>
          </div>
          <div className="flex gap-2 items-center detail-room">
            <FontAwesomeIcon className={"w-[15px]"} icon="location-dot" /><span>{event.room_string}</span>
          </div>
        </ScrollShadow>
      </div>
    )
  }

  const hoverEventContent = (event) => {
    return (
      <div hidden={!event.visible} className="rounded-e-md p-1 max-w-72 flex flex-col gap-2">
        <div>
          <p className="font-bold text-xs">{event.name}</p>
          <p className="text-xs">{setTime(event.start, event.duration)}</p>
        </div>
        <div className="flex flex-col gap-[3px] text-xs">
          <div className="flex gap-2 items-center detail-semester">
            <FontAwesomeIcon className={"w-[15px]"} icon="graduation-cap" /><span>{event.study_semester_string}</span>
          </div>
          <div className="flex gap-2 items-center detail-dozent">
            <FontAwesomeIcon className={"w-[15px]"} icon="user" /><span>{event.dozent_string}</span>
          </div>
          <div className="flex gap-2 items-center detail-room">
            <FontAwesomeIcon className={"w-[15px]"} icon="location-dot" /><span>{event.room_string}</span>
          </div>
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
    moveEvent.bordercolor = changeColor(moveEvent.backgroundcolor, -40)
    moveEvent.isAlgo = false
    moduleSetOutside(moveEvent)
    setEvents(filterForEvents())
    deleteModuleCalendarEntry(moveEvent)
    setConflicts(deleteConflictsWithCurrentModule(conflict_list, moveEvent))
    setSnackbarData({ type: "success", message: "Module removed from plan.", visible: true })
  };


  const handleDragStart = (event) => {
    moveEvent = event.event
  };

  const handleMouseUp = () => {
    moveEvent = null
  }

  const filterAction = () => {
    setEvents(filterForEvents())
  }

  function initConflicts() {
    const module_list = filterForConflict()
    for (const module of module_list) {
      setConflicts(checkModuleWarnings(filterForConflict(), conflict_list, module))
    }
  }

  async function reloadTimeTable(newEntrys, setProgress) {
    for (let i = 0; i < moduleItemList.length; i++) {
      if (newEntrys.map(e => e._id).includes(moduleItemList[i]._id)) {
        moduleItemList[i] = newEntrys.filter(e => e._id === moduleItemList[i]._id)[0]
      }
    }
    setEvents(filterForEvents())
    initConflicts()
    //window.location.reload(false);
    setProgress(true)
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
      <TimeTableFilter module_list={moduleItemList} filterAction={filterAction}></TimeTableFilter>
      <div className={"flex flex-col gap-5 h-fit lg:flex-row select-none"}>
        <SectionContainer className={"p-2 grow"}>
          <div onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
            <DnDCalendar
              className="select-none"
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              views={["week"]}
              defaultView="week"
              // min={moment("2024-01-01T08:00").toDate()}
              // max={moment("2024-01-01T23:59").toDate()}
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
        <SectionContainer className={"p-0 px-1 lg:w-[280px] max-h-[1000px]"}>
          <ModuleBar reload={reloadTimeTable} moduleItemList={filterForOutside().map(event => (
            <ModuleItem key={event._id} moduleItemData={event} dragEvent={setDraggedEvent} shortDisplay />
          ))} />
        </SectionContainer>
      </div>
      <ModuleInfo isOpen={isOpen} onOpenChange={onOpenChange} event={modalEvent} removeFunction={handleClickRemoveEvent} />
      <ConflictDisplay data={conflict_list} />
    </>
  );
}
