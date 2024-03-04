import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BasicDataMenu from "../components/BasicDataMenu";
import BasicDataTable from "../components/BasicDataTable";
import { FilledButton } from "../components/FilledButton";
import { OutlinedButton } from "../components/OutlinedButton";
import { PageTitle } from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import { useNavigate } from "react-router-dom";
import { getAllBasicDataModules } from "../services/moduleService";
import { rooms, teachers } from "../components/data2";

export default function BasicDataPage() {
  const { t } = useTranslation();
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllBasicDataModules();
        setModules(result.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    }
    fetchData();
  }, []);

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
  switch (selectedItem) {
    case "module":
      selectedData = modules;
      break;
    case "room":
      selectedData = rooms;
      break;
    case "teacher":
      selectedData = teachers;
      break;
    default:
      selectedData = modules; // Standardauswahl, wenn keine Übereinstimmung gefunden wurde
  }

  return (
    <PageContainer
      title={t("basicData")}
      showDeleteButton={false}
      showCancelButton={false}
      primaryButtonTitle={itemKeyToText[selectedItem]}
      onClickPrimary={() => navigate(path)}
      row={true}
    >
      <BasicDataMenu
        onItemClick={handleItemClick}
        selectedItem={selectedItem}
      />
      <BasicDataTable tableData={selectedData} />
    </PageContainer>
  );
}
