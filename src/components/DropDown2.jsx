import React from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {animals} from "./Data3";
import {filterDozent, filterRoom, filterStudySemester} from "../filter/filter"


// uses Dummy data from Data3.js, pls change!!!
export function DropDown2({module_list, category, filterAction, dropDownData, cLabel, cPlaceholder}) {
  
  const updateModules = (id) => {
    switch (category) {
      case "dozent":
        filterDozent(id, module_list)
        break;
        case "room":
        filterRoom(id, module_list)
        break;
        case "study_semester":
        filterStudySemester(id, module_list)
        break;
      default:
        console.log("incorrect category")
        break;
    }
    //trigger set events in timetable
    filterAction()
  }

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Autocomplete
        label={cLabel}
        placeholder={cPlaceholder}
        className="max-w-xs"
        defaultItems={dropDownData}
        onSelectionChange={updateModules}
      >
        {(item) => <AutocompleteItem key={item.dropdown_string}>{item.dropdown_string}</AutocompleteItem>}
      </Autocomplete>
    </div>
  );
}
