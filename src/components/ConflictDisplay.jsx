import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";

export function ConflictDisplay(data) {  

    const conflict_list = data.data;

    for (let i = 0; i < conflict_list.length; i++) {
        conflict_list[i].id = i     
    }

      function changeIgnore(key) {
        conflict_list[key].ignore = !conflict_list[key].ignore
        if(!conflict_list[key].ignore){
          conflict_list[key].style="border-1 border-s-8 rounded-e-md p-3 border-yellow-500/100 bg-yellow-500/50"
        } else {
          conflict_list[key].style="border-1 border-s-8 rounded-e-md p-3 border-grey-500/100 bg-grey-500/50"
        }
        console.log(conflict_list[key].ignore)
        console.log(conflict_list[key].style)
      }
    
  return (
    <ListboxWrapper>
      <Listbox
        items={conflict_list}
        aria-label="Dynamic Actions"
        onAction={(key) => changeIgnore(key)}
      >
        {(item) => (
          <ListboxItem
            key={item.id}
            className="border-1 border-s-8 rounded-e-md p-3 border-yellow-500/100 bg-yellow-500/50"
          >
            <div className="grid grid-rows-1 grid-flow-col">
              <div>
                <p className="font-bold">{item.error_message}</p>
                <p>Ausgelöst durch "{item.mod1.title}"</p>
              </div>
              <div className="">
              </div>
              {/* <button className="w-32 border-1 rounded-md border-yellow-500/100">Ignorieren</button> */}
              </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}