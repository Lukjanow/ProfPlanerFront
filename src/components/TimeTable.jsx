import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useState } from "react";
import { ModuleItem } from "./ModuleItem";
import { ModuleBar } from "./ModuleBar";


export function TimeTable({moduleItemList}) {


  const localizer = momentLocalizer(moment);
  const DnDCalendar = withDragAndDrop(Calendar);

  const EVENTS = [
    {
        id: 1,
        title: "Meeting 1",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
    },
    {
        id: 2,
        title: "Meeting 2",
        start: moment("2024-01-02T14:00").toDate(),
        end: moment("2024-01-02T18:00").toDate(),
    },
];

const OUTSIDEEVENTS = [
  {
      id: 3,
      title: "Meeting 3",
      duration: 120
  },
  {
      id: 4,
      title: "Meeting 4",
      duration: 90
  },
];


    // State für Termine und außerhalb des Kalenders gezogene Ereignisse
    const [events, setEvents] = useState(EVENTS);
    const [outsideEvents, setOutsideEvents] = useState(moduleItemList);
    const [draggedEvent, setDraggedEvent] = useState(null);

    // Callback für das Ablegen von außerhalb des Kalenders gezogenen Ereignissen
    const onDropFromOutside = useCallback(
      ({ start, end }) => {
        if (draggedEvent) {
              console.log("Außerhalb des Kalenders abgelegt:", draggedEvent.title, start, end);
              const newEvent = {
                  ...draggedEvent,
                  start,
                  end: moment(start).add(draggedEvent.duration, 'minutes'),
                  id: events.length + 1
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
        []
    );

  return (
    <>
      <div className="myCustomHeight">
          <DnDCalendar
              className="w-[73vw]"
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
              step={15}
              timeslots={4}
              selectable
              resizable={false}
              formats={{
                  dayFormat: (date, culture, localizer) => localizer.format(date, "dddd", culture),
              }}
              onEventDrop={({ start, end, event }) => {
                  onChangeEventTime(start, end, event.id);
              }}
              onDropFromOutside={onDropFromOutside}
              drilldownView={null}
          />
      </div>
      <div
            //onDropFromOutside={ backToOverview }
            >
              <ModuleBar moduleItemList={outsideEvents.map(event => (
                  <ModuleItem moduleItemData={event} dragEvent={setDraggedEvent}/>
                ))} />
            </div>
    </>
  );
}