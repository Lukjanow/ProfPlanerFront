import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useState } from "react";
import { ModuleItem } from "./ModuleItem";
import { ModuleBar } from "./ModuleBar";
import "../styles/components/timeTableEvent.scss";


export function TimeTable({moduleItemList}) {


  const localizer = momentLocalizer(moment);
  const DnDCalendar = withDragAndDrop(Calendar);

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

    const CustomEvent = ({ event }) => (
        <ModuleItem moduleItemData={event} dragEvent={()=>{}}/>
    );


  return (
    <>
      <div className="myCustomHeight">
          <DnDCalendar
              className="w-[77vw]"
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
              components={{
                event: CustomEvent
              }}
              step={15}
              timeslots={4}
              selectable
              resizable={false}
              formats={{dayFormat: (date, culture, localizer) => localizer.format(date, "dddd", culture)}}
              onEventDrop={({ start, end, event }) => {onChangeEventTime(start, end, event.id)}}
              onDropFromOutside={onDropFromOutside}
              drilldownView={null}
          />
      </div>
      <div
            //onDropFromOutside={ backToOverview }
            >
              <ModuleBar moduleItemList={outsideEvents.map(event => (
                  <ModuleItem key={event.id} moduleItemData={event} dragEvent={setDraggedEvent}/>
                ))} />
            </div>
    </>
  );
}