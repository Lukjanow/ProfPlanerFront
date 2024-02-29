import { useState } from "react";
import { useTranslation } from "react-i18next";
import BasicDataMenu from "../components/BasicDataMenu";
import BasicDataTable from "../components/BasicDataTable";
import { FilledButton } from "../components/FilledButton";
import { OutlinedButton } from "../components/OutlinedButton";
import { PageTitle } from "../components/PageTitle";
import { modules, rooms, teachers } from "../components/data2";
import { useNavigate, useLocation } from "react-router-dom";

export default function BasicDataPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let location = useLocation();

  const [selectedItem, setSelectedItem] = useState("module");

  const handleItemClick = (itemKey) => {
    setSelectedItem(itemKey);
  };

  const itemKeyToText = {
    module: t("newModule"),
    room: t("newRoom"),
    teacher: t("newLecturer"),
    building: t("newBuilding"),
  };

  // Dynamische Auswahl der Daten basierend auf dem ausgewählten Element
  let selectedData;
  let path;
  switch (selectedItem) {
    case "module":
      selectedData = modules;
      path = "/basicdata"
      break;
    case "room":
      selectedData = rooms;
      path = "/basicdata"
      break;
    case "teacher":
      selectedData = teachers;
      path = "/lecturer-details"
      break;
    default:
      selectedData = modules; // Standardauswahl, wenn keine Übereinstimmung gefunden wurde
      path = "/basicdata"
  }

  return (
    <>
      <div className="p-10">
        <div className="flex w-full justify-between">
          <h1 className="font-poppins font-semibold text-[48px]">
            {t("basicData")}
          </h1>
          <FilledButton
            text={itemKeyToText[selectedItem]}
            icon="plus"
            showIcon={true}
            onClick={() => {
              navigate(path);
            }}
          />
        </div>

        <div className="flex w-full">
          <BasicDataMenu
            onItemClick={handleItemClick}
            selectedItem={selectedItem}
          />
          <BasicDataTable tableData={selectedData} />
        </div>
      </div>
    </>
  );
}
