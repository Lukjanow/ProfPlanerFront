import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollShadow, Button, Tooltip } from "@nextui-org/react";
import React from "react"
import { useTranslation } from "react-i18next";
import { runAlgo } from "../services/algorithmService";
import { getEventStart, getEventEnd, parseEvent } from "../utils/calendarEventUtils";


export function ModuleBar({ moduleItemList }) {
  const { t } = useTranslation();

  async function startAlgo(){
    const result = await runAlgo();

    for (let i = 0; i < result.length; i++) {
      const start = getEventStart()
      const end = getEventEnd()
      const event = parseEvent()
    }

  }

  return (
    <div id="ModuleBar" className="ml-2 mt-10 p-3 shadow-2xl select-none">
      <div className={"flex justify-between items-center"}>
        <h2 className="text-3xl font-bold ml-2">Module</h2>
        <Tooltip content={t("generatePlan")}>
          <Button
          onClick={startAlgo}
            isIconOnly={true}
            color={"primary"}
            radius={"sm"}>
            <FontAwesomeIcon icon={"wand-magic-sparkles"} />
          </Button>
        </Tooltip>
      </div>
      <div className="mt-4 ml-2">
        <ScrollShadow size={0} className="h-[1220px] w-[14vw] space-y-3">
          {moduleItemList}
        </ScrollShadow>
      </div>
    </div>
  )
}