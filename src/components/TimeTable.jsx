import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useState } from "react";
import { ModuleItem } from "./ModuleItem";
import { ModuleBar } from "./ModuleBar";
import { ConflictDisplay } from "./ConflictDisplay";
import { PageTitle } from "../components/PageTitle";
import {TimeTableFilter} from "../components/TimeTableFilter";
import "../styles/components/timeTableEvent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useDisclosure} from "@nextui-org/react";
import { ModuleInfo } from './ModuleInfo';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment/dist/moment';
import 'moment/dist/locale/de';
import { useTranslation } from "react-i18next";
import {checkModuleWarnings, deleteConflictsWithCurrentModule} from "../conflicts/conflicts";

export function TimeTable({moduleItemListPara}) {  
  const { i18n } = useTranslation();

  moment.locale(i18n.language === "en" ? "en" : "de")
  
  const localizer = momentLocalizer(moment) 

  const DnDCalendar = withDragAndDrop(Calendar);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [modalEvent, setModalEvent] = useState('');

  console.log("SuperModule List:", moduleItemListPara)
    // State für Termine und außerhalb des Kalenders gezogene Ereignisse
    const [moduleItemList, setmoduleItemList] = useState(moduleItemListPara);
    const [events, setEvents] = useState(filterForEvents());
    const [conflict_list, setConflicts] = useState([]);
    const [draggedEvent, setDraggedEvent] = useState(null);


    function filterForEvents() {
      if(moduleItemList === undefined){
        return []
      }
      return moduleItemList.filter(e => e.isPlaced === true && e.visible === true)
    }

    function filterForOutside() {
      if(moduleItemList === undefined){
        return []
      }
      return moduleItemList.filter(e => e.isPlaced === false && e.visible === true)
    }

    function filterForConflict() {
      return moduleItemList.filter(e => e.isPlaced === true)
    }

    function updateModule(event){
      const newList = []
      for (let i = 0; i < moduleItemList.length; i++) {
        if(moduleItemList[i]._id === event._id){
          moduleItemList[i] = event
        }
        newList.push(moduleItemList[i])
      }
      setmoduleItemList(newList)
    }

    function moduleSetOutside(event){
      const newList = []
      for (let i = 0; i < moduleItemList.length; i++) {
        if(moduleItemList[i]._id === event._id){
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

  function setTime(start, duration){
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

      return (
        <p className="font-semibold">
          {startHours + ":"}
          {fixZeros(startMinutes) + " - "}
          {endHours + ":"}
          {fixZeros(endMinutes) + " Uhr"}
        </p>
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
    setConflicts(deleteConflictsWithCurrentModule(conflict_list, modalEvent))
  };

  const customEvent = ({ event }) => {
    return (
          <div hidden={!event.visible} id={event._id} data-user={event} onContextMenu={(click) => handleRightClick(event, click)} className="w-[13vw] rounded-e-md p-3 h-full w-full space-y-1">
            <ModuleInfo isOpen={isOpen} onOpenChange={onOpenChange} event={modalEvent} removeFunction={handleClickRemoveEvent}/>
            <p className="font-semibold">{event.name}</p>
            {setTime(event.start, event.duration)}
            <div className="flex">
              <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-graduation-cap" /></span><span>{event.study_semester_string}</span>
            </div>
            <div className="flex">
              <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-user" /></span><span>{event.dozent_string}</span>
            </div>
            <div className="flex">
              <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-location-dot" /></span><span>{event.room_string}</span>
            </div>
        </div>
    )
  }

  var moveEvent = null

  const handleMouseLeave = () => {
    if(moveEvent == null){
      return
    } 
    moduleSetOutside(moveEvent)
    setEvents(filterForEvents())
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
    setEvents(filterForEvents())
  }

  return (
    <>
      <div className="flex">
        <div>
          <PageTitle text="Lehrplanung"/>
          <TimeTableFilter module_list={moduleItemList} filterAction={filterAction}></TimeTableFilter>
          <div>
            <div id="removeBorder" onMouseLeave={handleMouseLeave} className="p-4 bg-white" onMouseUp={handleMouseUp}>
              <DnDCalendar
                  className="w-[78vw] select-none"
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  min={moment("2024-01-01T08:00").toDate()}
                  max={moment("2024-01-01T22:00").toDate()}
                  views={["work_week"]}
                  defaultView="work_week"
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
                  formats={{dayFormat: (date, culture, localizer) => localizer.format(date, "dddd", culture)}}
                  onEventDrop={({ start, end, event }) => {onChangeEventTime(start, end, event._id)}}
                  onDropFromOutside={onDropFromOutside}
                  drilldownView={null}
                  onDragStart={(event) => handleDragStart(event)}
              />
              </div>
              <ConflictDisplay data={conflict_list}/>
          </div>
        </div>
        <div>
          <ModuleBar moduleItemList={filterForOutside().map(event => (
              <ModuleItem key={event._id} moduleItemData={event} dragEvent={setDraggedEvent}/>
            ))} />
        </div>
      </div>
    </>
  );
}