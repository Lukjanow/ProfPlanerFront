import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export default function BasicDataMenu({ onItemClick }) {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(
    localStorage.getItem("selectedItem") || "module"
  ); // Initialisieren des ausgewählten Elements mit dem Wert aus dem localStorage oder "module", falls kein Wert vorhanden ist

  useEffect(() => {
    localStorage.setItem("selectedItem", selectedItem); // Speichern des ausgewählten Elements im localStorage
  }, [selectedItem]);

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
    setSelectedItem(itemKey); // Setzen des ausgewählten Elements
    onItemClick(itemKey); // Aufruf der übergebenen Funktion
  };

  return (
    <Listbox
      variant="flat"
      aria-label="Listbox menu with descriptions"
      className="w-[200px] px-1 py-2 rounded-small bg-content1 shadow-small h-fit"
    >
      {items.map((item) => (
        <ListboxItem
          key={item.key}
          selectionMode={"single"}
          className={`${selectedItem === item.key ? "bg-primary-100" : ""} p-3`}
          onClick={() => handleItemClick(item.key)}
        >
          {item.description}
        </ListboxItem>
      ))}
    </Listbox>
  );
}
