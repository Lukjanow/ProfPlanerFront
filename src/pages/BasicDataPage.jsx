import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BasicDataMenu from "../components/BasicDataMenu";
import BasicDataTable from "../components/BasicDataTable";
import PageContainer from "../components/PageContainer";
import NoContent from "../components/NoContent";
import { useNavigate } from "react-router-dom";
import { getAllBasicDataModules } from "../services/moduleService";
import { getAllDozents } from "../services/dozentService";
import { getAllRooms } from "../services/roomService";
import { getAllStudyCourses } from "../services/studyCourseService";

export default function BasicDataPage() {
  const { t } = useTranslation();
  const [modules, setModules] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studyCourses, setStudyCourses] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("module");

  async function fetchData() {
    try {
      const promises = [
        getAllBasicDataModules(),
        getAllRooms(),
        getAllDozents(),
        getAllStudyCourses(),
      ];

      const [resultModule, resultRooms, resultTeacher, resultStudyCourses] =
        await Promise.all(
          promises.map((promise) =>
            promise.catch((error) => {
              console.error("Error fetching data:", error);
              return { data: [] }; // Return empty data if there's an error
            })
          )
        );

      setModules(resultModule.data);
      setDataLength(resultModule.data.length);
      setRooms(resultRooms.data);
      setTeachers(resultTeacher.data);
      setStudyCourses(resultStudyCourses.data);

      console.log("----------> ResultsModule: ", resultModule);
      console.log("----------> ResultsRooms: ", resultRooms);
      console.log("----------> ResultsTeachers: ", resultTeacher);
      console.log("----------> ResultsStudyCourses: ", resultStudyCourses);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = (itemKey) => {
    setSelectedItem(itemKey);
  };

  const itemKeyToText = {
    module: t("newModule"),
    room: t("newRoom"),
    teacher: t("newLecturer"),
    building: t("newBuilding"),
    studycourse: t("newStudyCourse"),
  };

  const dataMapping = {
    module: { data: modules, path: "/module-details" },
    room: { data: rooms, path: "/room-details" },
    teacher: { data: teachers, path: "/dozent-details" },
    studycourse: { data: studyCourses, path: "/studycourse-details" },
    default: { data: modules, path: "/basicdata" },
  };

  const { data: selectedData, path } =
    dataMapping[selectedItem] || dataMapping.default;

  return (
    <PageContainer
      title={t("basicData")}
      showDeleteButton={false}
      showCancelButton={false}
      primaryButtonTitle={itemKeyToText[selectedItem]}
      onClickPrimary={() => navigate(`/basicdata${path}`)}
      row={true}
    >
      <BasicDataMenu
        onItemClick={handleItemClick}
        selectedItem={selectedItem}
      />
      {selectedData && selectedData.length > 0 ? (
        <BasicDataTable
          tableData={selectedData}
          path={path}
          fetchData={fetchData}
        />
      ) : (
        <NoContent />
      )}
      
      {/* <XLSXImport onClick={handleXLSX}/> */}
    </PageContainer>
  );
}
