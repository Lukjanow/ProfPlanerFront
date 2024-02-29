import moment from 'moment'; 
import 'moment/locale/de';  
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useState } from "react";
import { ModuleItem } from "./ModuleItem";
import { ModuleBar } from "./ModuleBar";
import { PageTitle } from "../components/PageTitle";
import {TimeTableFilter} from "../components/TimeTableFilter";
import "../styles/components/timeTableEvent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useDisclosure} from "@nextui-org/react";
import { ModuleInfo } from './ModuleInfo';


export function TimeTable({moduleItemList}) {
  moment.locale("de");
  const localizer = momentLocalizer(moment);
  const DnDCalendar = withDragAndDrop(Calendar);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [modalEvent, setModalEvent] = useState('');


    // State für Termine und außerhalb des Kalenders gezogene Ereignisse
    const [events, setEvents] = useState([]);
    const [outsideEvents, setOutsideEvents] = useState(moduleItemList);
    const [draggedEvent, setDraggedEvent] = useState(null);

    // Callback für das Ablegen von außerhalb des Kalenders gezogenen Ereignissen
    const onDropFromOutside = useCallback(
      ({ start, end }) => {
        console.log("Außerhalb des Kalenders abgelegt:", draggedEvent.title, start, end);
        if (draggedEvent) {
              const newEvent = {
                  ...draggedEvent,
                  start,
                  end: moment(start).add(draggedEvent.duration, 'minutes'),
                  id: draggedEvent.id,
                  hideTime: false
              };

              setEvents(prevEvents => [...prevEvents, newEvent]);
              setOutsideEvents(prevEvents => prevEvents.filter(event => event.id !== draggedEvent.id))
          }
      },
      [draggedEvent]
  );

  // Callback zum Aktualisieren der Terminzeit
  const onChangeEventTime = useCallback(
        (start, end, appointmentId) => {
            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event.id === appointmentId ? { ...event, start, end } : event
                )
            );
        },
    );

    const eventStyleGetter = (event) => {
      let newStyle = {};

      newStyle["backgroundColor"] = event.backgroundcolor;
      newStyle["borderColor"] = event.bordercolor
      newStyle["color"] = "#000000"
      newStyle["borderInlineStartWidth"] = "8px"


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

  const handleRemoveEvent = () => {
    const updatedEvents = events.filter(ev => ev.id !== modalEvent.id);
    setEvents(updatedEvents);
    setOutsideEvents(prevEvents => [...prevEvents, modalEvent])
  };

  const customEvent = ({ event }) => {
    return (
          <div id={event.id} data-user={event} onContextMenu={(click) => handleRightClick(event, click)} className="w-[13vw] rounded-e-md p-3 h-full w-full space-y-1">
            <ModuleInfo isOpen={isOpen} onOpenChange={onOpenChange} event={modalEvent} moveFunction={handleRemoveEvent}/>
            <p className="font-semibold">{event.title}</p>
            {setTime(event.start, event.duration)}
            <div className="flex">
              <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-graduation-cap" /></span><span>{event.studySemester}</span>
            </div>
            <div className="flex">
              <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-user" /></span><span>{event.dozent}</span>
            </div>
            <div className="flex">
              <span className="flex justify-center items-center justify-self-center w-[30px]"><FontAwesomeIcon icon="fa-solid fa-location-dot" /></span><span>{event.room}</span>
            </div>
        </div>
    )
  }


  return (
    <>
      <div className="flex">
        <div>
          <PageTitle text="Lehrplanung"/>
          <TimeTableFilter></TimeTableFilter>
          <div className="h-[35vw]">
              <DnDCalendar
                  className="w-[79vw] shadow-2xl pb-5 pt-5 pr-2 pl-2 select-none"
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
                  timeslots={4}
                  selectable
                  resizable={false}
                  formats={{dayFormat: (date, culture, localizer) => localizer.format(date, "dddd", culture)}}
                  onEventDrop={({ start, end, event }) => {onChangeEventTime(start, end, event.id)}}
                  onDropFromOutside={onDropFromOutside}
                  drilldownView={null}
              />
          </div>
        </div>
        <div>
          <ModuleBar moduleItemList={outsideEvents.map(event => (
              <ModuleItem key={event.id} moduleItemData={event} dragEvent={setDraggedEvent}/>
            ))} />
        </div>
      </div>
    </>
  );
}