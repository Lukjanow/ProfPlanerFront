import React from "react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem, Button} from "@nextui-org/react";


export function DropDown({Items, selectionMode = "single", disabledKeys = [], variant="solid", backdrop="Transparent", description=""}) {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
    const selectedValue = React.useMemo(
      () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys]
    );

    console.log(Items[0].label)
    return (
      <div>
        <Dropdown backdrop={backdrop}
          closeOnSelect="false">
          <DropdownTrigger>
            <Button variant="bordered">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions"
                  selectionMode={selectionMode}
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                  disabledKeys={disabledKeys}
                  variant={variant}
                  description={description}
                  defaultSelectedKeys={Items[0].key}>
          {/* TODO: Include DropdownItem for searching*/}
          {/* TODO: Add Sections https://nextui.org/docs/components/dropdown#with-sections*/}
            { /*TODO: Add styling according to Mockup https://nextui.org/docs/components/dropdown#customizing-the-dropdown-items-style*/
                Items.map((data) => (
                    <DropdownItem key={data.key}
                      color={data?.color}
                      description={data?.description}
                      className={data?.className}
                      shortcut={data?.shortcut}
                      startContent={data?.startContent}
                      href={data?.href}
                      title={data.label}
                    >{data.label}</DropdownItem>
                    )
                )
                }
          </DropdownMenu>
        </Dropdown>
      </div>
    )
}
