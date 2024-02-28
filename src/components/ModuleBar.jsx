import { ModuleItem } from "./ModuleItem";
import { ScrollShadow } from "@nextui-org/react";
import React from "react"


export function ModuleBar({moduleItemList}) {  
  return (
    <div id="ModuleBar" className="ml-2 mt-10 shadow-lg">
      <h2 className="text-3xl font-bold">Module</h2>
      <div className="mt-4">
        <ScrollShadow size={0} className="h-[806px] w-[16vw] space-y-3">
            {moduleItemList}
        </ScrollShadow>
      </div>
    </div>
  )
}