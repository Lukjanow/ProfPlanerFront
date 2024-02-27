import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModuleItem } from "./ModuleItem";
import { ScrollShadow } from "@nextui-org/react";


export function ModuleBar({moduleItemList}) {
  const moduleItemData = {
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
    };

  return (
    <div id="ModuleBar" className="ml-2 shadow-lg">
      <h2 className="text-3xl font-bold">Module</h2>
      <div className="mt-4">
        <ScrollShadow size={0} className="h-[65vh] w-[325px] space-y-3">
            {moduleItemList.map((item, index) => (
              <div key={index}>
                <ModuleItem moduleItemData={item}/>
                </div>
            ))}
          {/* {createModuleItems(moduleItemList)} */}
        </ScrollShadow>
      </div>
    </div>
  )
}
