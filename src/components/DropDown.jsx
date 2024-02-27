import React, { useState, useEffect } from "react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem, Button, DropdownSection, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/components/DropDown.scss"


{/*TODO: Deal with Performance when many Items exist*/}

//Allow Button to Display the Label of Item rather than the Key
function GetLabels(selectedKeys, Items) {
  let Labels = ""
  selectedKeys.forEach((element) => {
    Items.forEach((item) =>{
      if (item.key === element){
        Labels += item.label + ", "
      }
    })
  }
  )
  return Labels
}

export function DropDown({Items, selectionMode = "single", disabledKeys = [], variant="underlined", backdrop="Transparent", description="", add={}, width="300px"}) {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const selectedValue = React.useMemo(
       () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys],
    )

    const [value, setValue] = React.useState("Nothing Selected")
    const [dropped, setDropped] = React.useState(false)

    function toggleDropped() {
      setDropped(!dropped)
    }

    /* TODO: get this to work the first time you load the site (probably with useEffect) */
    function setSelected(input) {
      setSelectedKeys(input)
      setValue((selectedValue) ? GetLabels(input, Items) : "Nothing Selected")
    }

/*     useEffect(() => {
      setValue((selectedValue) ? GetLabels(value, Items) : "Nothing Selected")
    }, [selectedValue, value, Items]) */

    //const sections = Array.from(new Set(Items.map(obj => obj["section"]).filter(value => value !== undefined)));
    return (
      <div>
        <Dropdown backdrop={backdrop}
          closeOnSelect={(selectionMode === "single") ? true : false}
          onOpenChange={toggleDropped}
          >
          <DropdownTrigger>
            <Input
              as="button"
              variant="underlined"
              label={description}
              endContent= { (dropped) ? 
                <div className="arrow-up"></div>
                : <div className="arrow-down"></div>
              }
              style={{width: width}}
              value={value}
            >

            </Input>

          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions"
                  selectionMode={selectionMode}
                  selectedKeys={selectedKeys}
                  onSelectionChange={
                    setSelected
                  }
                  disabledKeys={disabledKeys}
                  variant={variant}>
          
          {(add.href && add.Item) ? 
            <DropdownItem
             href={add.href}
             showDivider="true"
            >            {/*TODO: Fix style*/}
              <FontAwesomeIcon className={"text-small"} icon="plus" style={{marginRight: "5px"}}/>Füge ein(e) {add.Item} hinzu</DropdownItem>
             : null
          }
          {/* TODO: Add functions for search
            <DropdownSection title="Searchbar">
              <DropdownItem id="DropSearchbar" contentEditable="true" data-selectable="false">
                <Input id="SearchDrop"></Input>
              </DropdownItem>
            </DropdownSection>
          */}  

          {/* TODO: Fix Sections to work with a Multiplier (map(), foreach(), (...), Whatever works) https://nextui.org/docs/components/dropdown#with-sections*/}
           {
            /*Items.some(e => e.section) ? (
              sections.map((section) => {
                {console.log(section)}
                <DropdownSection
                title={"section"}
                showDivider={true}
                >
                { {
                  Items.map((data) => (
                    <DropdownItem key={data.key}
                      color={data?.color}
                      description={data?.description}
                      className={data?.className}
                      shortcut={data?.shortcut}
                      startContent={data?.startContent}
                      href={data?.href}
                      title={data.label} />
                 }
                </DropdownSection>
                }
              ))
              :*/
                Items.map((data) => (
                <DropdownItem key={data.key}
                  color={data?.color}
                  description={data?.description}
                  className={data?.className}
                  shortcut={data?.shortcut}
                  startContent={data?.startContent}
                  href={data?.href}
                  title={data.label} />
                ))
          } 
          </DropdownMenu>
        </Dropdown>
      </div>
    )
}
