import { useCallback, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import moment from 'moment';
import {ModuleBar} from "../components/ModuleBar"
import "moment/locale/de";
import { ModuleItem } from "../components/ModuleItem";

// Lokalisierung für Moment.js einrichten
moment.locale("de");

// Lokalisierung für den Kalender einrichten
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

// Beispieltermine
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

export default function MyCalendar() {
    // State für Termine und außerhalb des Kalenders gezogene Ereignisse
    const [events, setEvents] = useState(EVENTS);
    const [outsideEvents, setOutsideEvents] = useState(OUTSIDEEVENTS);
    const [draggedEvent, setDraggedEvent] = useState(null);

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
    /*
        const backToOverview = useCallback(

        )
        */

    // TODO: Übersetzung einfügen

    const moduleItemDataList = [
      {
        id: 1,
        title: "Einführung in die Informatik",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: "Angewandte Informatik, 1. FS",
        dozent: "Herbert Thielen",
        room: "A200",
        backgroundcolor: "#D6F5E2",
        bordercolor: "#46D27F",
        hideTime: true,
      },
      {
        id: 2,
        title: "Webentwicklung",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: "Angewandte Informatik, 3. FS",
        dozent: "Schwarzer",
        room: "D137",
        backgroundcolor: "#9fc5e8",
        bordercolor: "#137ad8",
        hideTime: true,
      },
      {
        id: 3,
        title: "Storage Management",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: "QSP Network Security",
        dozent: "Herbert Thielen",
        room: "N37",
        backgroundcolor: "#f9cb9c",
        bordercolor: "#d27b22",
        hideTime: true,
      },
      {
        id: 4,
        title: "Netzwerke",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: "AI-B 2, WI-B 4",
        dozent: "Herbert Thielen",
        room: "A200",
        backgroundcolor: "#d5a6bd",
        bordercolor: "#d32e7f",
        hideTime: true,
      },
      {
        id: 5,
        title: "Selbst und Methodenkompetenz",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: "Angewandte Informatik, 1. FS",
        dozent: "Wehrstein",
        room: "D137",
        backgroundcolor: "#ca9966",
        bordercolor: "#6f4316",
        hideTime: true,
      },
      {
        id: 6,
        title: "Statistik",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: "Bachelor WI 2, Bachelor AI 2",
        dozent: "Herbert Thielen",
        room: "N37",
        backgroundcolor: "#a2c4c9",
        bordercolor: "#106875",
        hideTime: true,
      }
    ];


    return (
        <>
            <h1>Lehrplanung</h1>
            <div className="flex">
                <div className="myCustomHeight">
                    <DnDCalendar
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
                <ModuleBar moduleItemList={moduleItemDataList}/>
                {/* onDropFromOutside={ backToOverview } */}
                <div>          
                    {outsideEvents.map(event => (
                    <div
                        key={event.id}
                        style={{ backgroundColor: 'blue', margin: '5px', padding: '5px', color: 'white' }}
                        draggable
                        onDragStart={() => setDraggedEvent(event)} // Funktion in onDragStart einbetten
                    >
                        {event.title}
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
}
