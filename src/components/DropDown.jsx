import React from "react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem, Button, DropdownSection, Input } from "@nextui-org/react";
import addIcon from "../assets/addIcon.svg"  //Currently doesn't work
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


{/*Deal with Performance when many Items exist*/}

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

export function DropDown({Items, selectionMode = "single", disabledKeys = [], variant="solid", backdrop="Transparent", description="" /*currently unused*/, add={}}) {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const selectedValue = React.useMemo(
       () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys],
    )
    //const sections = Array.from(new Set(Items.map(obj => obj["section"]).filter(value => value !== undefined)));
    return (
      <div>
        <Dropdown backdrop={backdrop}
          closeOnSelect={(selectionMode === "single") ? true : false}>
          <DropdownTrigger>
            {
             /*TODO: Add styling according to Mockup 
            TODO: Set to more fitting Component than Button (Depeding on style)*/
            }
            <Button>
              {
              (selectedValue) ? GetLabels(selectedKeys, Items) : "Nothing Selected"
              }
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions"
                  selectionMode={selectionMode}
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
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
