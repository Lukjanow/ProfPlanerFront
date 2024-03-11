import { ScrollShadow } from "@nextui-org/react";
import React, { useState } from "react"


export function ModuleBar({moduleItemList}) {  

  return (
    <div id="ModuleBar" className="ml-2 mt-10 shadow-2xl select-none">
      <h2 className="text-3xl font-bold ml-2 pt-5">Module</h2>
      <div className="mt-4 ml-2">
        <ScrollShadow size={0} className="h-[1220px] w-[14vw] space-y-3">
            {moduleItemList}
        </ScrollShadow>
      </div>
    </div>
  )
}