import React, { useState, useEffect } from "react";
import { addXLSXModule } from "../services/moduleService";
import XLSXImport from "../components/xlsxImport";
import { useTranslation } from "react-i18next";
import "../styles/components/DropDown.scss";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem, DropdownSection, Input } from "@nextui-org/react";

export default function Testpage(
) {
  const { t } = useTranslation();
  const testData = [
    {
      key: "1",
      label: "Item1",
      description: "This Item is very good",
      color: "blue"
  }, {
      key: "2",
      label: "Item2"
  }, {
      key: "3",
      label: "Item3"
  },{ key: "4", label: "Item4"}
  ,{ key: "5", label: "Item5"}
  ,{ key: "6", label: "Item6"}
  ,{ key: "7", label: "Item7"}
  ,{ key: "8", label: "Item8"}
  ,{ key: "9", label: "Item9"}
]



  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));
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
      setValue((selectedValue) ? GetLabels(selectedKeys, testData) : t("nothingSelected"))
      setPrevKeys(selectedKeys)
    }
  },
        [setValue, value, selectedValue, selectedKeys, t, setPrevKeys, prevKeys]
      )
    

  return (
    <div>
        <Dropdown backdrop={"Transport"}
          closeOnSelect={false}
          onOpenChange={toggleDropped}
          shouldBlockScroll="false"
          >
          <DropdownTrigger>
            <Input
              label={"description"}
              endContent= { (dropped) ? 
                <div className="arrow-up"></div>
                : <div className="arrow-down"></div>
              }
              style={{width: "500px", textAlign: "left"}}
              value={value}
              isRequired={true}
            >
            </Input>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions"
                  disallowEmptySelection={true}
                  selectionMode={"multiple"}
                  selectedKeys={selectedKeys}
                  onSelectionChange={
                    setSelectedKeys
                  }
                  style={{width: "500px",
                          overflow: "scroll",
                          scrollbarColor: "grey",
                          scrollbarWidth: "thin",
                          overflowX: "hidden",
                          maxHeight: "385px"}}>
            {/* 
              <DropdownSection title="Searchbar">
                <DropdownItem id="DropSearchbar" contentEditable="true" data-selectable="false">
                  <Input id="SearchDrop"></Input>
                </DropdownItem>
              </DropdownSection>
            */}  

            {
                  testData.map((data) => (
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
  );
}
