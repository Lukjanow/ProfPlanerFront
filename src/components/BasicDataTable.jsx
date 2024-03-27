import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  printArrWithSpecificAction,
  printArrAsString,
  printMapAsStringByKey,
  printMapAsStringByKeys, printMapAsStringByNestedKeys,
} from "../utils/stringUtils.js";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal.jsx";
import { deleteDozent } from "../services/dozentService.js";
import { deleteModule } from "../services/moduleService.js";
import { deleteRoom } from "../services/roomService.js";
import { deleteStudyCourse } from "../services/studyCourseService.js";
import { Context } from "../routes/root.jsx";
import SearchModal from "./SearchModal.jsx";


export default function BasicDataTable({ tableData, path, fetchData }) {
  const { t } = useTranslation();
  const [length, setLength] = useState(0);
  const excludeColumnKeys = ["_id"];
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null); // State to store the ID of the item to be deleted
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [filteredItems, setFilteredItems] = useState(tableData)
  const [isFiltered, setIsFiltered] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [setSnackbarData] = useContext(Context)

  const [showSearchModal, setShowSearchModal] = useState(false)
  let columnKeys = [];

  // Funktion zum Aktualisieren der Länge der Daten
  useEffect(() => {
    if (tableData) {
      setLength(tableData.length);
    }
  }, [tableData]);

  useEffect(() => {
    const pathParts = path.split("-");
    const element = pathParts[0];

    switch (element) {
      case "/room":
        setSearchPlaceholder(t("searchByRoom"));
        setDeleteMessage(t("deleteRoomInfo"));
        setSearchTerm("");
        break;
      case "/dozent":
        setSearchPlaceholder(t("searchByDozent"));
        setDeleteMessage(t("deleteDozentInfo"));
        setSearchTerm("");
        break;
      case "/module":
        setSearchPlaceholder(t("searchByModule"));
        setDeleteMessage(t("deleteModuleInfo"));
        setSearchTerm("");
        break;
      case "/studycourse":
        setSearchPlaceholder(t("searchByStudyCourse"));
        setDeleteMessage(t("deleteStudyCourseInfo"));
        setSearchTerm("");
        break;
      default:
        console.error("Unknown element type:", element);
        return;
    }
  }, [path, t]);

  useEffect(() => {
    if (isFiltered == true) {
      setLength(filteredItems.length)
      if (length == 0) {
        setSnackbarData({ type: "error", message: t("noItemsForSearchTerm"), visible: true })
      }
    }
    if (searchTerm == "" && isFiltered == true) {
      setIsFiltered(false)
      setLength(tableData.length)
      setFilteredItems([])
    }
  }, [searchTerm, tableData, filteredItems, isFiltered])


  const generateColumns = () => {
    if (!tableData || !tableData[0]) return [];
    columnKeys = Object.keys(tableData[0]).filter(
      (key) => !excludeColumnKeys.includes(key)
    );

    return Object.keys(columnKeys).map((key) => {
      return {
        name: t(columnKeys[key]).toUpperCase(),
        uid: columnKeys[key].toLowerCase(),
        sortable: true,
      };
    });
  };



  const handleDelete = async (id) => {
    let deleteFunction;
    let elementType;

    // Extrahiere den Typ des Elements und die ID aus dem Pfad
    const pathParts = path.split("-");
    const element = pathParts[0];

    // Bestimme den Typ des Elements basierend auf dem Pfad
    switch (element) {
      case "/room":
        deleteFunction = deleteRoom;
        elementType = "room"; /**/
        break;
      case "/dozent":
        deleteFunction = deleteDozent;
        elementType = "dozent";
        break;
      case "/module":
        deleteFunction = deleteModule;
        elementType = "module"; /**/
        break;
      case "/studycourse":
        deleteFunction = deleteStudyCourse;
        elementType = "studycourse" /**/
        break;
      default:
        console.error("Unknown element type:", element);
        return;
    }


    deleteFunction(id)
      .then(response => {
        console.log(`${t(elementType)} ${t("successfullyDeleted")}`, response);
        setSnackbarData({ type: "success", message: `${t(elementType)} ${t("successfullyDeleted")}`, visible: true })
        navigate("/basicdata")
        setShowModal(false);
        fetchData()
      })
      .catch(error => {
        console.error(`${t("errorDeleting")} ${t(elementType)}.`, error);
        setSnackbarData({ type: "error", message: `${t("errorDeleting")} ${t(elementType)}.`, visible: true })
      })
  };


  const searchFunction = (searchTerm) => {
    const pathParts = path.split("-");
    const element = pathParts[0];
    setFilteredItems([])
    tableData.forEach((item) => {
      switch (element) {
        case "/room":
          if (searchTerm.includes("capacity:")) {
            if (item.capacity == parseInt(searchTerm.split("capacity:")[1])) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("capacity>")) {
            if (item.capacity > parseInt(searchTerm.split("capacity>")[1])) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("capacity<")) {
            if (item.capacity < parseInt(searchTerm.split("capacity<")[1])) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("roomType:")) {
            if (item.roomType.toLowerCase().includes(searchTerm.toLowerCase().split("roomtype:")[1].replace(/^\s+/, ''))) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (item.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
            setFilteredItems(old => [...old, item])
          }
          break;
        case "/dozent":
          if (searchTerm.includes("salutation:")) {
            if (item.salutation.toLowerCase().includes(searchTerm.toLowerCase().split("salutation:")[1].replace(/^\s+/, ''))) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("email:")) {
            if (item.email.toLowerCase().includes(searchTerm.toLowerCase().split("email:")[1].replace(/^\s+/, ''))) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("title:")) {
            if (item.title.toLowerCase().includes(searchTerm.toLowerCase().split("title:")[1].replace(/^\s+/, ''))) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if ((item.prename.toLowerCase() + " " + item.lastname.toLowerCase()).includes(searchTerm.toLowerCase())) {
            setFilteredItems(old => [...old, item])
          }
          break;
        case "/module":
          if (searchTerm.includes("dozent:")) {
            if (item.dozent.some(obj => `${obj.prename} ${obj.lastname}`.toLowerCase().includes(searchTerm.toLowerCase().split("dozent:")[1].replace(/^\s+/, '')))) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("room:")) {
            if (item.room.some(obj => `${obj.roomNumber}`.toLowerCase().includes(searchTerm.toLowerCase().split("room:")[1].replace(/^\s+/, '')))) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("studyCourse:")) {
            if (item.studySemester.some(obj => obj.studyCourse.name.toLowerCase().includes(searchTerm.toLowerCase().split("studycourse:")[1].replace(/^\s+/, '')))) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("duration:")) {
            if (item.duration == parseInt(searchTerm.split("duration:")[1])) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("duration>")) {
            if (item.duration > parseInt(searchTerm.split("duration>")[1])) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("duration<")) {
            if (item.duration < parseInt(searchTerm.split("duration<")[1])) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            setFilteredItems(old => [...old, item])

          }
          break;
        case "/studycourse":
          if (searchTerm.includes("semesterCount:")) {
            if (item.semesterCount == parseInt(searchTerm.split("semesterCount:")[1])) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("semesterCount>")) {
            if (item.semesterCount > parseInt(searchTerm.split("semesterCount>")[1])) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("semesterCount<")) {
            if (item.semesterCount < parseInt(searchTerm.split("semesterCount<")[1])) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (searchTerm.includes("content:")) {
            if (item.content.some(str => str.toLowerCase().includes(searchTerm.toLowerCase().split("content:")[1].replace(/^\s+/, '')))) {
              setFilteredItems(old => [...old, item])
            }
            break;
          }
          if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            setFilteredItems(old => [...old, item])

          }
          break;
        default:
          console.error("Unknown element type:", element);
          return;
      }
      setIsFiltered(true)
    })
  }

  //handle Key pressed in input
  const handleKeyDown = (e) => {
    if (e.key == 'Enter') {
      searchFunction(searchTerm)
    }
  }

  const myColumns = generateColumns();

  const topContent = (
    <div className="flex w-full justify-between items-center">
      <h1 className="font-poppins font-bold text-2xl">{t("overview")} ({length})</h1>
      <div className={"flex w-1/2 items-center"}>
        <Input
          isClearable
          placeholder={searchPlaceholder}
          startContent={
            <FontAwesomeIcon
              icon={"magnifying-glass"}
              onClick={() => searchFunction(searchTerm)}
            />
          }
          onKeyDown={handleKeyDown}
          radius="sm"
          size="sm"
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <Button
          color={"none"}
          isIconOnly
          onPress={() => {
            console.log("Show search modal");
            setShowSearchModal(true);
            console.log(showSearchModal)
          }}
        >
          <FontAwesomeIcon icon="fa-regular fa-circle-question" size="xl" />
        </Button>
      </div>
    </div>
  );

  function determineRendering(key, value) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <TableCell>-</TableCell>;
      }
      /*
            console.log("key:", key);

            console.log("value:", value); */

      // if (value[0] && value[0].studyCourse) {
      //   console.log("studyCourse name:",

      if (key === "dozent") {
        return (
          <TableCell>
            {printMapAsStringByKeys(value, ["prename", "lastname"])}
          </TableCell>
        );
      } else if (key === "studySemester") {
        return <TableCell>
          {
            printArrWithSpecificAction(value, (item) =>
              printMapAsStringByNestedKeys(item, ["studyCourse", "name"])
            )
          }
        </TableCell>;
      } else if (key === "room") {
        return (
          <TableCell>{printMapAsStringByKey(value, "roomNumber")}</TableCell>
        );
      } else if (key === "content") {
        console.log("Sers");
        return (
          <TableCell>{printArrAsString(value, "content")}</TableCell>
        );
      }

      return <TableCell key={key}>Unknown key: {key}</TableCell>;
    }
    return <TableCell key={key}>{value ? value : "-"}</TableCell>;
  }

  return (
    <>
      <SearchModal
        value={showSearchModal}
        headlineText={path.split("-")[0]}
        onClickCancel={() => {
          setShowSearchModal(false);
        }}
      />

      <DeleteModal
        value={showModal}
        onClickCancel={() => {
          setShowModal(false);
        }}
        onClickDelete={() => {
          handleDelete(deleteItemId);
        }}
        headlineText={t("deleteQuestion")}
        bodyText={deleteMessage}
      />

      <Table aria-label="table" radius="sm" topContent={topContent}>
        <TableHeader
          columns={[...myColumns, { name: t("actions"), uid: "actions" }]}
        >
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={(isFiltered) ? filteredItems : tableData}>
          {(item) => (
            <TableRow key={item._id} id={item._id}>
              {columnKeys.map((key) => determineRendering(key, item[key]))}
              <TableCell>
                <div className="relative flex items-center gap-7">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => {
                      const navigatePath = `/basicdata${path}/${item._id}`;
                      console.log("-----> Path: ", path);
                      navigate(navigatePath);
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon icon={"pen"} />
                  </span>
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() => {
                      console.log("-----> Clicked on Delete!");
                      setDeleteItemId(item._id); // Setzen Sie die ID des zu löschenden Elements
                      setShowModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={"trash"} />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
