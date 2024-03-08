import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {DropDown2} from "./DropDown2";
import { useState, useEffect } from "react";
import { getAllDozents } from "../services/dozentService";
import { getAllTrueRooms } from "../services/roomService";
import { getAllStudySemesters } from "../services/studySemesterService";
import { FilledButton } from "./FilledButton";


export function TimeTableFilter({module_list, filterAction}) {
  const [dozentData, setDozentData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [studySemesterData, setStudySemesterData] = useState([]);
  // const [calendarEntries, setcalendarEntries] = useState([]);

  const filterOff = (module_list) => {
      for(const module of module_list){
          module.visible = true
      }
    filterAction()
  }


  useEffect(() => {
    async function fetchData() {
      try {
        //dozent
        const dozent_result = await getAllDozents();
        var dozent_list = []
        for (const [key, value] of Object.entries(dozent_result.data)) {
          const dozent_string = String(value.prename) + " " + String(value.lastname)
          value["dropdown_string"] = dozent_string
          dozent_list.push(value)
        }
        setDozentData(dozent_list);

        //room
        const room_result = await getAllTrueRooms();
        console.log("Rooms",room_result)
        var room_list = []
        for (const [key, value] of Object.entries(room_result.data)) {
          const room_string = String(value.name)
          value["dropdown_string"] = room_string
          room_list.push(value)
        }
        setRoomData(room_list);

        //studySemester
        const studySemester_result = await getAllStudySemesters();
        console.log("studySemesters",studySemester_result)
        var studySemester_list = []
        for (const [key, value] of Object.entries(studySemester_result.data)) {
          const studySemester_string = String(value.name)
          value["dropdown_string"] = studySemester_string
          studySemester_list.push(value)
        }
        setStudySemesterData(studySemester_list);
      } catch(error) {
        console.log("Error: ", error);
      }
    }
    fetchData()
  }, []);
  
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options"
      className="p-1" color="white" classNames={{tabList:"rounded"}}>
        <Tab key="photos" title="Studiengang">
          <Card

          radius="sm">
            <CardBody
            className="bg-[#EEEEEE]">
            <DropDown2 module_list={module_list} filterAction={filterAction} dropDownData={studySemesterData} category="study_semester" cLabel="Fachsemester" cPlaceholder="Suche nach Fachsemester"/>
            <FilledButton text="Reset" onClick={filterOff(module_list)}/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="music" title="Lehrperson">
          <Card
          radius="sm">
            <CardBody
            className="bg-[#EEEEEE]">
            <DropDown2 module_list={module_list} filterAction={filterAction} dropDownData={dozentData} category="dozent" cLabel="Lehrperson" cPlaceholder="Suche nach Lehrperson"/>
            {/* <FilledButton text="Reset" onClick={filterOff}/> */}
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="videos" title="Raum">
          <Card
          radius="sm">
            <CardBody
            className="bg-[#EEEEEE]">
            <DropDown2 module_list={module_list} filterAction={filterAction} dropDownData={roomData} category="room" cLabel="Raum" cPlaceholder="Suche nach Raum"/>
            {/* <FilledButton text="Reset" onClick={filterOff}/> */}
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}