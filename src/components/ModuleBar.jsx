import { ModuleItem } from "./ModuleItem";
import { ScrollShadow } from "@nextui-org/react";
import React from "react"


export function ModuleBar({moduleItemList}) {  
  return (
    <div id="ModuleBar" className="ml-2 shadow-lg">
      <h2 className="text-3xl font-bold">Module</h2>
      <div className="mt-4">
        <ScrollShadow id="scroller" size={0} className="h-[65vh] w-[345px] space-y-3">
            {moduleItemList}
        </ScrollShadow>
      </div>
    </div>
  )
}