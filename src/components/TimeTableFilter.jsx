import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Tab, } from "@nextui-org/react";

export function TimeTableFilter() {
  return (
    <div className="flex w-full flex-col">
      <Tabs radius="none" className="shadow-none">
        <Tab key="tab1" title="Tab 1" className="shadow-none">
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        </Tab>
        <Tab key="tab2" title="Tab 2" className="shadow-none">
          <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
        </Tab>
        <Tab key="tab3" title="Tab 3" className="shadow-none">
          <div>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </Tab>
      </Tabs>
    </div>
  );
}