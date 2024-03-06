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
import { PageTitle } from "../components/PageTitle";

moment.locale("de");
const localizer = momentLocalizer(moment);

export default function MyCalendar() {
    const moduleItemDataList = [
      {
        id: 1,
        title: "Einführung in die Informatik",
        type: "Modul",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: ["AI-B 1"],
        dozent: ["Herbert Thielen"],
        room: ["A200"],
        backgroundcolor: "#D6F5E2",
        bordercolor: "#46D27F",
        duration: 195,
      },
      {
        id: 2,
        title: "Rechnernetze und Netzwerksicherheit",
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
        id: 3,
        title: "Betriebssysteme",
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
        id: 4,
        title: "Softwarequalität",
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
      title: "Datenbanken",
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
      title: "Fullstack Webanwendungen",
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
      title: "Katze Streicheln",
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
    ];

    return (
        <>
            <div className="flex">
                <TimeTable moduleItemList={moduleItemDataList}/>
            </div>
        
        </>
    );
}
