import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox, ListboxItem, cn } from "@nextui-org/react";

export default function BasicDataList() {
  const items = [
    {
      key: "module",
      description: "Module",
      icon: "pen-to-square",
    },
    {
      key: "room",
      description: "Räume",
      icon: "door-closed",
    },
    {
      key: "teacher",
      description: "Lehrpersonen",
      icon: "user",
    },
    {
      key: "building",
      description: "Gebäude",
      icon: "building",
    },
  ];

  return (
    <Listbox
      variant="flat"
      aria-label="Listbox menu with descriptions"
      className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100"
    >
      {items.map((item) => (
        <ListboxItem
          key={item.key}
          description={`Erstelle und bearbeite ${item.description}`}
          startContent={<FontAwesomeIcon icon={item.icon} />}
        >
          {item.description}
        </ListboxItem>
      ))}
    </Listbox>
  );
}
