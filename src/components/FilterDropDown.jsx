import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { filterDozent, filterRoom, filterStudySemester } from "../filter/filter"
import { useTimeTableFilterStore } from "../stores/timeTableFilterStore.js";


// uses Dummy data from Data3.js, pls change!!!
export function FilterDropDown({ module_list, category, filterAction, dropDownData, cLabel, cPlaceholder }) {
  const setFilteredType = useTimeTableFilterStore(state => state.setFilteredType);
  const setFilteredValue = useTimeTableFilterStore(state => state.setFilteredValue);

  const updateModules = (id) => {
    setFilteredType(category);
    switch (category) {
      case "dozent":
        filterDozent(id, module_list)
        setFilteredValue(id);
        break;
      case "room":
        filterRoom(id, module_list)
        setFilteredValue(id);
        break;
      case "study_semester":
        filterStudySemester(id, module_list)
        setFilteredValue(id);
        break;
      default:
        console.log("incorrect category")
        break;
    }
    //trigger set events in timetable
    filterAction()
  }

  return (
    <Autocomplete
      label={cLabel}
      placeholder={cPlaceholder}
      defaultItems={dropDownData}
      size={"sm"}
      className={"md:w-[450px] select-none"}
      onSelectionChange={updateModules}
    >
      {(item) => <AutocompleteItem key={item.dropdown_string}>{item.dropdown_string}</AutocompleteItem>}
    </Autocomplete>
  );
}
