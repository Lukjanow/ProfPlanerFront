import { Tabs, Tab } from "@nextui-org/react";
import { FilterDropDown } from "./FilterDropDown";
import { useState, useEffect } from "react";
import { getAllDozents } from "../services/dozentService";
import { getAllRooms } from "../services/roomService";
import { getAllStudyCourses } from "../services/studyCourseService";
import { ExportCalendarButton } from "./ExportCalendarButton.jsx";
import { useTranslation } from "react-i18next";
import { SectionContainer } from "./SectionContainer.jsx";


export function TimeTableFilter({ module_list, filterAction }) {
  const { t } = useTranslation();
  const [dozentData, setDozentData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [studySemesterData, setStudySemesterData] = useState([]);
  // const [calendarEntries, setcalendarEntries] = useState([]);

  function filterOff(module_list) {
    for (const module of module_list) {
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
        const room_result = await getAllRooms();
        var room_list = []
        for (const [key, value] of Object.entries(room_result.data)) {
          const room_string = String(value.roomNumber)
          value["dropdown_string"] = room_string
          room_list.push(value)
        }
        setRoomData(room_list);

        //studySemester
        const studyCourse_result = await getAllStudyCourses();
        console.log("RESULT", studyCourse_result.data)
        var studySemester_list = []
        for (const value of studyCourse_result.data) {
          for (let i = 0; i < value.semesterCount; i++) {
            const studySemester_string = String(value.name) + " " + "Semester " + String(i + 1)
            var help_dict = {}
            help_dict["dropdown_string"] = studySemester_string
            studySemester_list.push(help_dict)
          }
          for (let i = 0; i < value.content.length; i++) {
            const studySemester_string = String(value.name) + " " + String(value.content[i])
            var help_dict = {}
            help_dict["dropdown_string"] = studySemester_string
            studySemester_list.push(help_dict)
          }
          // const studySemester_string = String(value.name)
          // value["dropdown_string"] = studySemester_string
          // studySemester_list.push(value)
        }
        console.log(studySemester_list)
        setStudySemesterData(studySemester_list);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    fetchData()
  }, []);

  return (
    <div className={"select-none"}>
      <Tabs
        aria-label="Options"
        className={"select-none"}
        classNames={{
          tabContent: "p-3"
        }}
      >
        <Tab
          key="studycourse"
          title={t("studycourse")}
          className="pb-0 px-0"
        >
          <SectionContainer className={"p-0"}>
            <div className="flex justify-between items-center gap-5">
              <FilterDropDown
                module_list={module_list}
                filterAction={filterAction}
                dropDownData={studySemesterData}
                category="study_semester"
                cLabel={t("studysemester")}
                cPlaceholder={t("search_for_studysemester")}
              />
              <ExportCalendarButton />
            </div>
          </SectionContainer>
        </Tab>
        <Tab
          key="lecturer"
          title={t("lecturer")}
          className="pb-0 px-0"
        >
          <SectionContainer className={"p-0"}>
            <div className="flex justify-between items-center">
              <FilterDropDown
                module_list={module_list}
                filterAction={filterAction}
                dropDownData={dozentData}
                category="dozent"
                cLabel={t("lecturer")}
                cPlaceholder={t("search_for_teacher")}
              />
              <ExportCalendarButton />
            </div>
          </SectionContainer>
        </Tab>
        <Tab
          key="room"
          title={t("room")}
          className="pb-0 px-0"
        >
          <SectionContainer className={"p-0"}>
            <div className="flex justify-between items-center">
              <FilterDropDown
                module_list={module_list}
                filterAction={filterAction}
                dropDownData={roomData}
                category="room"
                cLabel={t("room")}
                cPlaceholder={t("search_for_room")}
              />
              <ExportCalendarButton />
            </div>
          </SectionContainer>
        </Tab >
      </Tabs >
    </div>
  );
}