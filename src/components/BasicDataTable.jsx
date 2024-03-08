import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Link,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  printArrAsStringByKey,
  printArrAsStringByKeys,
} from "../utils/stringUtils.js";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal.jsx";
import { deleteDozent } from "../services/dozentService.js";
import { deleteModule } from "../services/moduleService.js";
import { deleteRoom } from "../services/roomService.js";

export default function BasicDataTable({ tableData, path, fetchData }) {
  const { t } = useTranslation();
  const [length, setLength] = useState(0);
  const excludeColumnKeys = ["_id"];
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null); // State to store the ID of the item to be deleted
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search");
  const [deleteMessage, setDeleteMessage] = useState("");
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
        break;
      case "/dozent":
        setSearchPlaceholder(t("searchByDozent"));
        setDeleteMessage(t("deleteDozentInfo"));
        break;
      case "/module":
        setSearchPlaceholder(t("searchByModule"));
        setDeleteMessage(t("deleteModuleInfo"));
        break;
      default:
        console.error("Unknown element type:", element);
        return;
    }
  }, [path, t]);

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
        elementType = "room";
        break;
      case "/dozent":
        deleteFunction = deleteDozent;
        elementType = "dozent";
        break;
      case "/module":
        deleteFunction = deleteModule;
        elementType = "module";
        break;
      default:
        console.error("Unknown element type:", element);
        return;
    }

    try {
      // Rufe die entsprechende Löschfunktion auf
      await deleteFunction(id);
      console.log(`${elementType} deleted successfully`);
      setShowModal(false);

      // Nach dem Löschen erneut Daten abrufen und die Tabelle aktualisieren
      fetchData();
    } catch (error) {
      console.error(`Error deleting ${elementType}:`, error);
    }
  };

  const myColumns = generateColumns();

  const topContent = (
    <div className="flex w-full justify-between items-center">
      <h1 className="font-poppins font-bold text-2xl">Überblick ({length})</h1>
      <Input
        isClearable
        placeholder={searchPlaceholder}
        className="flex-initial w-1/2"
        startContent={
          <FontAwesomeIcon
            icon={"magnifying-glass"}
            onClick={() => console.log("Test")}
          />
        }
        radius="sm"
        variant={"underlined"}
      />
    </div>
  );

  function determineRendering(key, value) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <TableCell>-</TableCell>;
      }

      if (key === "dozent") {
        return (
          <TableCell>
            {printArrAsStringByKeys(value, ["prename", "lastname"])}
          </TableCell>
        );
      } else if (key === "studySemester") {
        return <TableCell>{printArrAsStringByKey(value, "name")}</TableCell>;
      } else if (key === "room") {
        return (
          <TableCell>{printArrAsStringByKey(value, "roomNumber")}</TableCell>
        );
      }

      return <TableCell key={key}>Unknown key: {key}</TableCell>;
    }
    return <TableCell key={key}>{value ? value : "-"}</TableCell>;
  }

  return (
    <>
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
        <TableBody items={tableData}>
          {(item) => (
            <TableRow key={item._id} id={item._id}>
              {columnKeys.map((key) => determineRendering(key, item[key]))}
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Edit">
                    {/*
                    <Link to={`${path}/${item._id}`}>
                      <FontAwesomeIcon icon={"pen"} />
                    </Link>
                    */}

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
                  </Tooltip>
                  <Tooltip color="danger" content="Delete">
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
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
