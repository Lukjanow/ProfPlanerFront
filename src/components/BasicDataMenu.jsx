import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button, Divider, Listbox, ListboxItem, ListboxSection} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import {getExportData} from "../services/importExportService.js";

export default function BasicDataMenu({ onItemClick, selectedItem }) {
  const { t } = useTranslation();

  const items = [
    {
      key: "module",
      description: t("module"),
      icon: "pen-to-square",
    },
    {
      key: "room",
      description: t("rooms"),
      icon: "door-closed",
    },
    {
      key: "teacher",
      description: t("lecturer"),
      icon: "user",
    },
    {
      key: "studycourse",
      description: t("studycourse"),
      icon: "user",
    }
  ];

  const actionItems = [
    {
      key: "importBasicDataAsXLSX",
      description: t("importAsXLSX"),
      icon: "file-upload",
      doAction: () => {
        console.log("importBasicDataAsXLSX clicked!");
      }
    },
    {
      key: "exportBasicDataAsXLSX",
      description: t("exportAsXLSX"),
      icon: "file-download",
      doAction: async () => {
        await getExportData();
      }
    }
  ]

  const handleItemClick = (itemKey) => {
    onItemClick(itemKey); // Aufruf der übergebenen Funktion
  };

  return (
    <Listbox
      variant="flat"
      aria-label="Listbox menu with descriptions"
      className="w-[200px] px-1 py-2 rounded-small bg-content1 shadow-small h-fit"
    >
      <ListboxSection showDivider>
        {items.map((item) => (
            <ListboxItem
                key={item.key}
                selectionMode={"single"}
                // startContent={
                //   <FontAwesomeIcon className={"text-md w-[25px]"} icon={item.icon} />
                // }
                className={`${selectedItem === item.key ? "bg-primary-100" : ""} p-3`}
                onClick={() => handleItemClick(item.key)}
            >
              {item.description}
            </ListboxItem>
        ))}
      </ListboxSection>

      <ListboxSection>
        {actionItems.map((item) => (
            <ListboxItem
                key={item.key}
                selectionMode={"single"}
                // startContent={
                //   <FontAwesomeIcon className={"text-md w-[25px]"} icon={item.icon} />
                // }
                className={`p-3`}
                onClick={item.doAction}
            >
              {item.description}
            </ListboxItem>
        ))}
      </ListboxSection>

    </Listbox>
  );
}
