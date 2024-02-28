import { useCallback, useState } from "react";
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

// const OUTSIDEEVENTS = [
//     {
//         id: 3,
//         title: "Meeting 3",
//         duration: 120
//     },
//     {
//         id: 4,
//         title: "Meeting 4",
//         duration: 90
//     },
// ];

export default function MyCalendar() {
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
        duration: 195,
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
        duration: 195,
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
        duration: 195,
      },
      {
        id: 4,
        title: "Rechnernetze und Netzwerksicherheit",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: "AI-B 2, WI-B 4",
        dozent: "Herbert Thielen",
        room: "A200",
        backgroundcolor: "#d5a6bd",
        bordercolor: "#d32e7f",
        hideTime: true,
        duration: 195,
      },
      {
        id: 5,
        title: "Selbst- und Methodenkompetenz",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: "Angewandte Informatik, 1. FS",
        dozent: "Elisabeth Heinemann",
        room: "D137",
        backgroundcolor: "#ca9966",
        bordercolor: "#6f4316",
        hideTime: true,
        duration: 195,
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
        duration: 195,
      },
      {
      id: 7,
      title: "Datenbanken",
      start: moment("2024-01-01T12:00").toDate(),
      end: moment("2024-01-01T15:00").toDate(),
      studySemester: "Angewandte Informatik, 2. FS",
      dozent: "Norman Riegel",
      room: "D138",
      backgroundcolor: "#36abad",
      bordercolor: "#1b8f90",
      hideTime: true,
      duration: 195,
    },
    {
      id: 8,
      title: "Fullstack Webanwendungen",
      start: moment("2024-01-02T14:00").toDate(),
      end: moment("2024-01-02T18:00").toDate(),
      studySemester: "Angewandte Informatik, 4. FS",
      dozent: "Jens Kohler",
      room: "A200",
      backgroundcolor: "#ea9999",
      bordercolor: "#e70000",
      hideTime: true,
      duration: 195,
    }
    ];

    return (
        <>
            <h1>Lehrplanung</h1>
            <TimeTableFilter>
                
            </TimeTableFilter>
            <div className="flex">
                <TimeTable moduleItemList={moduleItemDataList}/>
            </div>
        
        </>
    );
}
