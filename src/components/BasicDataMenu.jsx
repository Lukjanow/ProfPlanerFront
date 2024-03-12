import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

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
    },
  ];

  const handleItemClick = (itemKey) => {
    onItemClick(itemKey); // Aufruf der übergebenen Funktion
  };

  return (
    <Listbox
      variant="flat"
      aria-label="Listbox menu with descriptions"
      className="min-w-[200px] max-w-[200px] px-1 py-2 rounded-small bg-content1 shadow-small max-h-fit"
    >
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
    </Listbox>
  );
}
