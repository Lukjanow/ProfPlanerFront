import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollShadow, Button, Tooltip, Progress, Card, CardBody } from "@nextui-org/react";
import React from "react"
import { useTranslation } from "react-i18next";
import { runAlgo } from "../services/algorithmService";
import { getEventStart, getEventEnd, parseEvent } from "../utils/calendarEventUtils";
import { useState } from "react";
import { useselectedTimetableStore } from "../stores/selectedTimetableStore";


export function ModuleBar({undo, reload, moduleItemList }) {
  const { t } = useTranslation();
  const [showProgress, setshowProgress] = useState(true)
  const timeTableID = useselectedTimetableStore(state => state.timeTableID);

  const progressBar = () => {
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

  async function startAlgo() {
    setshowProgress(false)
    const result = await runAlgo({id:timeTableID});

    var events = []

    for (let i = 0; i < result.data.length; i++) {
      const start = getEventStart(result.data[i].time_stamp)
      const end = getEventEnd(start, result.data[i].module.duration)
      const event = parseEvent(result.data[i], result.data[i].module, start, end, true)
      event.bordercolor = "#f4941e"
      event.isAlgo = true
      events.push(event)
    }

    reload(events, setshowProgress)

  }

  return (
    <>
      {progressBar()}
      <div className={"flex justify-start items-center gap-1 select-none pb-2"}>
        <Tooltip content={t("generatePlan")}>
          <Button
            onClick={startAlgo}
            color={"primary"}
            size={"sm"}
            radius={"sm"}>
            <FontAwesomeIcon icon={"wand-magic-sparkles"} />
            {t("generate")}
          </Button>
        </Tooltip>
        <Tooltip content={t("undo")}>
          <Button
            onClick={undo}
            isIconOnly={true}
            color={"primary"}
            size={"sm"}
            radius={"sm"}
            variant={"bordered"}>
            <FontAwesomeIcon icon={"rotate-left"} />
          </Button>
        </Tooltip>
      </div>
      <ScrollShadow size={35} className={"max-h-full space-y-2"}>
        {moduleItemList}
      </ScrollShadow>
    </>
  )
}