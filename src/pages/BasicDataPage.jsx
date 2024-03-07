import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BasicDataMenu from "../components/BasicDataMenu";
import BasicDataTable from "../components/BasicDataTable";
import { FilledButton } from "../components/FilledButton";
import { OutlinedButton } from "../components/OutlinedButton";
import { PageTitle } from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import NoContent from "../components/NoContent";
import { useNavigate } from "react-router-dom";
import { getAllBasicDataModules } from "../services/moduleService";
import { getAllDozents } from "../services/dozentService";
import { getAllRooms } from "../services/roomService";
import { rooms, teachers } from "../components/data2";
import useDataFetcher from "../hooks/useDataFetcher";
import { useModuleStore } from "../stores/moduleStore";

export default function BasicDataPage() {
  const { t } = useTranslation();
  const [modules, setModules] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [dataLength, setDataLength] = useState(0);
  const navigate = useNavigate();

  /*
  const {
    data: moduleList,
    isLoading: moduleListIsLoading,
    error: moduleListError,
    executor: moduleListExecutor,
  } = useDataFetcher(async () => {
    return useModuleStore.getState().getAllBasicDataModules();
  });
  const {
    data: roomList,
    isLoading: roomListIsLoading,
    error: roomListError,
    executor: roomListExecutor,
  } = useDataFetcher(async () => {
    return useModuleStore.getState().getAllBasicDataModules();
  });
  const {
    data: teacherList,
    isLoading: teacherListIsLoading,
    error: teacherListError,
    executor: teacherListExecutor,
  } = useDataFetcher(async () => {
    return useModuleStore.getState().getAllBasicDataModules();
  });
  */

  /*
  useEffect(() => {
    moduleListExecutor();
    roomListExecutor();
    teacherListExecutor();
  }, []);
  */

  useEffect(() => {
    async function fetchData() {
      try {
        const resultModule = await getAllBasicDataModules();
        const resultRooms = await getAllRooms();
        const resultTeacher = await getAllDozents();
        setModules(resultModule.data);
        setDataLength(resultModule.data.length);
        setRooms(resultRooms.data);
        setTeachers(resultTeacher.data);

        console.log("----------> ResultsModule: ", resultModule);
        console.log("----------> ResultsRooms: ", resultRooms);
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
  //const [selectedData, setSelectedData] = useState([]);
  let selectedData;
  let path;

  switch (selectedItem) {
    case "module":
      //setSelectedData(moduleList);
      selectedData = modules;
      path = "/basicdata";
      console.log("-----------> Module!!!!", selectedData);
      break;
    case "room":
      //setSelectedData(roomList);
      selectedData = rooms;
      path = "/room-details";
      console.log("-----------> ROOM!!!!", selectedData);
      break;
    case "teacher":
      //setSelectedData(teacherList);
      selectedData = teachers;
      path = "/lecturer-details";
      console.log("-----------> TEACHER!!!!", selectedData);
      break;
    default:
      selectedData = moduleList; // Standardauswahl, wenn keine Übereinstimmung gefunden wurde
      path = "/basicdata";
      console.log("-----------> DEFAULT!!!!", selectedData);
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
      {selectedData && selectedData.length > 0 ? (
        <BasicDataTable tableData={selectedData} />
      ) : (
        <NoContent />
      )}
    </PageContainer>
  );
}
