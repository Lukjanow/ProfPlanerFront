import { useCallback, useEffect, useState } from "react";
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
import { getAllModules } from "../services/moduleService"

moment.locale("de");
const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  const [modules, setModules] = useState([]);

    const moduleItemDataList = [
      {
        id: "65d70a20bd82b03aeac92a56",
        name: "Einführung in die Informatik",
        type: "Modul",
        start: moment("2024-01-01T12:00").toDate(),
        end: moment("2024-01-01T15:00").toDate(),
        studySemester: ["AI-B 1"],
        dozent: ["Herbert Thielen"],
        room: ["B200"],
        backgroundcolor: "#D6F5E2",
        bordercolor: "#46D27F",
        duration: 195,
      },
      {
        id: "65d70acbbd82b03aeac92a5c",
        name: "Rechnernetze und Netzwerksicherheit",
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
        id: "65d71e619004f2a19971f8bd",
        name: "Betriebssysteme",
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
        id: "65d738b5a421a928cd955b63",
        name: "Softwarequalität",
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
      name: "Datenbanken",
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
      name: "Fullstack Webanwendungen",
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
      name: "Katze Streicheln",
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

    function initModules(module_list){
      var list = []

      for (let i = 0; i < module_list.length; i++) {
        // try{
          list.push({
            id: i + 1,
            name: module_list[i].name,
            type: "Type",
            start: moment("2024-01-01T12:00").toDate(),
            end: moment("2024-01-01T15:00").toDate(),
            study_semester_name: " S",
            dozent_name: String(module_list[i].dozent[0].prename) + " " + String(module_list[i].dozent[0].lastname),
            room_name: module_list[i].room[0] != null? String(module_list[i].room[0].name) : "kein Raum",
            backgroundcolor: "#D6F5E2",
            bordercolor: "46D27F",
            duration: 195
          })
        //   module_list[i].backgroundcolor = "#D6F5E2";
        //   module_list[i].bordercolor = "#46D27F";
        //   module_list[i].start = moment("2024-01-01T12:00").toDate();
        //   module_list[i].end = moment("2024-01-01T15:00").toDate();
        //   module_list[i].dozent_name = String(module_list[i].dozent[0].prename) + " " + String(module_list[i].dozent[0].lastname);
        //   module_list[i].room_name = String(module_list[i].room[0].name);
        //   module_list[i].study_semester_name = String(module_list[i].study_semester[0].name);
        //   module_list[i].backgroundcolor = "#D6F5E2";
        //   module_list[i].backgroundcolor = "#D6F5E2";
        //   module_list[i].id = i + 1
        //   console.log("ITEM ",i,": ", module_list[i])
        // } catch(error) {
        //   module_list.splice(i, 1)
        //   i--;
        // }
      // }
        }
        return list
    }

    useEffect(() => {
      async function fetchData() {
        try {
          const result = await getAllModules();
          setModules(result.data);
        } catch(error) {
          console.log("Error: ", error);
        }
      }
      fetchData()
    }, []);

    return (
        <div className="flex">
          <TimeTable moduleItemList={moduleItemDataList}/>
        </div>
        // <>
        // { modules.length !== 0 ?
        //     <div className="flex">
        //         <TimeTable moduleItemList={moduleItemDataList}/>
        //     </div> : <TimeTable moduleItemList={[]}/>
        // }
        // </>
    );
}
