import React from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {animals} from "./Data3";


// uses Dummy data from Data3.js, pls change!!!
export function DropDown2() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Autocomplete
        label="Favorite Animal"
        placeholder="Search an animal"
        className="max-w-xs"
        defaultItems={animals}
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
    </div>
  );
}
