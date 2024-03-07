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

export default function BasicDataTable({ tableData, path }) {
  const { t } = useTranslation();
  const [length, setLength] = useState(0);
  const excludeColumnKeys = ["_id"];
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null); // State to store the ID of the item to be deleted
  let columnKeys = [];

  // Funktion zum Aktualisieren der Länge der Daten
  useEffect(() => {
    if (tableData) {
      setLength(tableData.length);
    }
  }, [tableData]);

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

  const handleDelete = (id) => {
    let deleteFunction;
    let elementType;

    console.log("You are in handle Delete Funktion!!");

    // Extrahiere den Typ des Elements und die ID aus dem Pfad
    const pathParts = path.split("-");
    const element = pathParts[0];

    console.log(
      "You are in handle Delete Funktion, this is your ID: ",
      id,
      "Element: ",
      element
    );

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

    // Rufe die entsprechende Löschfunktion auf
    deleteFunction(id)
      .then((response) => {
        console.log(`${elementType} deleted: `, response);
      })
      .catch((error) => {
        console.error(`Error deleting ${elementType}:`, error);
      });

    setShowModal(false);

    navigate("/basicdata");
  };

  const myColumns = generateColumns();

  const topContent = (
    <div className="flex w-full justify-between items-center">
      <h1 className="font-poppins font-bold text-2xl">Überblick ({length})</h1>
      <Input
        isClearable
        placeholder="Search by name..."
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
          handleDelete(deleteItemId); // Übergeben Sie das deleteItemId an handleDelete
        }}
        headlineText={t("deleteQuestion")}
        bodyText={t("deleteDozentInfo")}
      />

      <Table aria-label="table" radius="sm" topContent={topContent}>
        <TableHeader
          columns={[...myColumns, { name: "ACTIONS", uid: "actions" }]}
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
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={() => {
                        navigate(`${path}/${item._id}`);
                      }}
                    >
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
