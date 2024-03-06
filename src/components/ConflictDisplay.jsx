import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
export function ConflictDisplay(data) {  
    const conflict_list = data.data;

    console.log(conflict_list)
    for (let i = 0; i < conflict_list.length; i++) {
        conflict_list[i].id = i
        console.log(conflict_list[i].id)        
    }


      const pop = (key) => {
        // Filter out the clicked item from the conflict list
        for (let i = 0; i < conflict_list.length; i++) {
            if(conflict_list[i].id == key){
                conflict_list.splice(i, 1);
                i--;
            }
        }
        console.log(conflict_list)
      };
    

  //`border-1 border-s-8 w-max border-[${bordercolor}] bg-[${backgroundcolor}] rounded-e-md p-3`}{
  return (
    <ListboxWrapper>
      <Listbox
        items={conflict_list}
        aria-label="Dynamic Actions"
        onAction={(key) => alert(key)}
      >
        {(item) => (
          <ListboxItem
            key={item.id}
            // startContent={<AddNoteIcon className={iconClasses} />}
            // color={item.key === "delete" ? "danger" : "default"}
            className="border-1 border-s-8 rounded-e-md p-3 border-yellow-500/100 bg-yellow-500/50"
          >
            <p className="font-bold">{item.error_message}</p>
            <p>Ausgelöst durch "{item.mod1.title}"</p>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}