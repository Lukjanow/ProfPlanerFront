import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollShadow, Button, Tooltip, Progress, Card, CardBody } from "@nextui-org/react";
import React from "react"
import { useTranslation } from "react-i18next";
import { runAlgo } from "../services/algorithmService";
import { getEventStart, getEventEnd, parseEvent } from "../utils/calendarEventUtils";
import { useState, useEffect } from "react";
import { faL } from "@fortawesome/free-solid-svg-icons";


export function ModuleBar({reload, moduleItemList }) {
  const { t } = useTranslation();
  const [showProgress, setshowProgress] = useState(true)

  const progressBar = () =>{
    return (
      <div hidden={showProgress}>
      <Card
            className={"fixed top-3 left-2/4 translate-x-[-40%] z-[100] h-11 pr-6 min-w-[300px]"}
            shadow={"sm"}
            radius={"sm"}
        >
            <CardBody className={"ml-2 flex gap-2 items-center p-0"}>
              <p className="mt-1">{t("algoWorking")}...</p>
                <Progress
                    size="sm"
                    isIndeterminate
                    aria-label="Loading..."
                />
            </CardBody>
        </Card>
    </div>
    )
  }

  async function startAlgo(){
    setshowProgress(false)
    const result = await runAlgo();

    var events = []

    for (let i = 0; i < result.data.length; i++) {
      const start = getEventStart(result.data[i].time_stamp)
      const end = getEventEnd(start, result.data[i].module.duration)
      const event = parseEvent(result.data[i] , result.data[i].module, start, end)
      event.bordercolor = "#a64d79"
      events.push(event)
    }
   
    reload(events, setshowProgress)

  }

  return (
    <div id="ModuleBar" className="ml-2 mt-10 p-3 shadow-2xl select-none">
      {progressBar()}
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