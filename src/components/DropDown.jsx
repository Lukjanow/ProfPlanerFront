import React, { useEffect } from "react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem, DropdownSection, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/components/DropDown.scss";
import { useTranslation } from "react-i18next";


{/*
TODO: Add functions for search
TODO: Fix Sections to work with a Multiplier (map(), foreach(), (...), Whatever works) https://nextui.org/docs/components/dropdown#with-sections*/}


export function DropDown({Items, selectionMode = "single", disabledKeys = [], variant="underlined", backdrop="Transparent", description="",
            add={}, width="250px", onChange = {/*pass*/}, values = []}) {
    const { t } = useTranslation();

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(Object.values(values).filter(obj => Object.prototype.hasOwnProperty.call(obj, "key"))
                                                                                                    .map(obj => obj["key"])));
    const selectedValue = React.useMemo(
       () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys],
    )

    const [value, setValue] = React.useState(t("nothingSelected"))
    const [prevKeys, setPrevKeys] = React.useState(new Set([]))
    const [dropped, setDropped] = React.useState(false)

    //deal with arrow in Input in DropdownTrigger
    function toggleDropped() {
      setDropped(!dropped)
    }

      //Allow Input to Display the Label of Item rather than the Key
    function GetLabels(selectedKeys, Items) {
      let Labels = ""
      let arr = Array.from(selectedKeys)
      arr.forEach((element, index, array) => {
        Items.forEach((item) =>{
          if (item.key === element){
            Labels += item.label
            if (index !== array.length - 1) { Labels += ", " }  //Deal with seperation
          }
        })
      }
      )
      return Labels
    }


    //Update Labels of Input to show selected Items correctly
    useEffect(() => {
      if ( prevKeys !== selectedKeys ){
        setValue((selectedValue) ? GetLabels(selectedKeys, Items) : t("nothingSelected"))
        onChange({
          keys: selectedKeys
        })
        setPrevKeys(selectedKeys)
      }
    },
          [setValue, value, Items, selectedValue, selectedKeys, onChange, description, t, setPrevKeys, prevKeys]
        )

    //const sections = Array.from(new Set(Items.map(obj => obj["section"]).filter(value => value !== undefined)));
    return (
      <div
      style={{backgroundColor: "#0000000F", width: width, borderBottom: "solid 2px black"}}>
        <Dropdown backdrop={backdrop}
          closeOnSelect={(selectionMode === "single") ? true : false}
          onOpenChange={toggleDropped}
          shouldBlockScroll="false"
          >
          <DropdownTrigger>
            <Input
              label={description}
              endContent= { (dropped) ? 
                <div className="arrow-up"></div>
                : <div className="arrow-down"></div>
              }
              style={{width: width, textAlign: "left"}}
              value={value}
            >
            </Input>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions"
                  selectionMode={selectionMode}
                  selectedKeys={selectedKeys}
                  onSelectionChange={
                    setSelectedKeys
                  }
                  disabledKeys={disabledKeys}
                  variant={variant}
                  style={{width: width,
                          overflow: "scroll",
                          scrollbarWidth: "none",
                          maxHeight: "385px"}}>
            {(add.href && add.Item) ? 
              <DropdownItem
              href={add.href}
              showDivider="true">
                <FontAwesomeIcon className={"text-small"} icon="plus" style={{marginRight: "5px"}}/>Füge ein(e) {add.Item} hinzu</DropdownItem>
              : null
            }
            {/* 
              <DropdownSection title="Searchbar">
                <DropdownItem id="DropSearchbar" contentEditable="true" data-selectable="false">
                  <Input id="SearchDrop"></Input>
                </DropdownItem>
              </DropdownSection>
            */}  

            {
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
