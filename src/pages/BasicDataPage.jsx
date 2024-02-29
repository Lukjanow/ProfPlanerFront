import { useState } from "react";
import { useTranslation } from "react-i18next";
import BasicDataMenu from "../components/BasicDataMenu";
import BasicDataTable from "../components/BasicDataTable";
import { FilledButton } from "../components/FilledButton";
import { OutlinedButton } from "../components/OutlinedButton";
import { PageTitle } from "../components/PageTitle";

export default function BasicDataPage() {
  const { t } = useTranslation();

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
              console.log("Button wurde geklickt!");
            }}
          />
        </div>

        <div className="flex w-full">
          <BasicDataMenu
            onItemClick={handleItemClick}
            selectedItem={selectedItem}
          />
          <BasicDataTable />
        </div>
      </div>
    </>
  );
}
