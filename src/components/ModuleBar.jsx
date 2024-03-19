import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollShadow, Button, Tooltip } from "@nextui-org/react";
import React from "react"
import { useTranslation } from "react-i18next";


export function ModuleBar({ moduleItemList }) {
  const { t } = useTranslation();

  return (
    <>
      <div className={"flex justify-between items-center"}>
        <h2 className="text-3xl font-bold ml-2">Module</h2>
        <Tooltip content={t("generatePlan")}>
          <Button
            isIconOnly={true}
            color={"primary"}
            radius={"sm"}>
            <FontAwesomeIcon icon={"wand-magic-sparkles"} />
          </Button>
        </Tooltip>
      </div>
      <ScrollShadow size={25} className="flex flex-col gap-2 overflow-scroll">
        {moduleItemList}
      </ScrollShadow>
    </>
  )
}