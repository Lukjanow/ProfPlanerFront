import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {DropDown2} from "./DropDown2";

export function TimeTableFilter({module_list}) {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options"
      className="p-1" color="white" classNames={{tabList:"rounded"}}>
        <Tab key="photos" title="Studiengang">
          <Card

          radius="sm">
            <CardBody
            className="bg-[#EEEEEE]">
            <DropDown2 module_list={module_list} category="study_semester"/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="music" title="Lehrperson">
          <Card
          radius="sm">
            <CardBody
            className="bg-[#EEEEEE]">
            <DropDown2 module_list={module_list} category="dozent"/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="videos" title="Raum">
          <Card
          radius="sm">
            <CardBody
            className="bg-[#EEEEEE]">
            <DropDown2 module_list={module_list} category="room"/>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}