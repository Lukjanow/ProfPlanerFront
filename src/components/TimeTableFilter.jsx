import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Tab, Card, CardBody} from "@nextui-org/react";

export function TimeTableFilter() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options"
      className="p-1" color="white" classNames={{tabList:"rounded"}}>
        <Tab key="photos" title="Studiengang">
          <Card

          radius="sm">
            <CardBody
            className="bg-[#EEEEEE]">
            Hier ist der Filter für Studiengänge!
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="music" title="Lehrperson">
          <Card
          radius="sm">
            <CardBody
            className="bg-[#EEEEEE]">
            Hier ist der Filter für Lehrpersonen!
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="videos" title="Raum">
          <Card
          radius="sm">
            <CardBody
            className="bg-[#EEEEEE]">
            Hier ist der Filter für Räume!
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}